import axios from 'axios'
import lockfile from '../../../icons/icons.lock.json' with { type: 'json' }
import pkg from '../../../package.json' with { type: 'json' }
import iconsJson from '../../../icons/icons.json' with { type: 'json' }
import FormData from 'form-data'
import { createReadStream, writeFileSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { kebabCase } from '../../../bin/rename.js'
import { prettierFormat } from '../../../bin/build/prettierFormat.js'
import ansiColors from 'ansi-colors'

const iconAssetsPath = resolve(import.meta.dirname, '../dist/assetPaths.json')
const assetData = JSON.parse(readFileSync(iconAssetsPath, 'utf-8') ?? '{}')

const removedIcons = readFileSync(
    resolve(import.meta.dirname, '../removed-icons.txt'),
    'utf-8'
).split('\n')

if (!process.env.ROBLOX_PUBLISH_KEY)
    throw new Error(
        'You forgot your Roblox API key. Use `node --env-file=.env ./publishIcons.js`'
    )

const endpoints = {
    publish: 'https://apis.roblox.com/assets/v1/assets',
    operations: oid => `https://apis.roblox.com/assets/v1/operations/${oid}`,
    asset: aid => `https://apis.roblox.com/assets/v1/assets/${aid}`,
}

async function publishAsset(iconName, filename) {
    const imagePath = resolve(
        import.meta.dirname,
        `../../../icons/png@5x/white`,
        filename + '.png'
    )
    const form = new FormData()
    form.append(
        'request',
        JSON.stringify({
            assetType: 'decal',
            displayName: iconName,
            description: `${iconName} icon from ProIcons`,
            creationContext: {
                creator: {
                    userId: '7571396322',
                },
            },
        })
    )
    form.append('fileContent', createReadStream(imagePath), {
        filename: `${filename}.png`,
        contentType: 'image/png',
    })
    const res = await axios.post(endpoints.publish, form, {
        headers: {
            ...form.getHeaders(),
            'x-api-key': process.env.ROBLOX_PUBLISH_KEY,
        },
        responseType: 'json',
    })
    return res.data
}

async function getOperation(operationId) {
    const res = await axios.get(endpoints.operations(operationId), {
        headers: {
            'x-api-key': process.env.ROBLOX_PUBLISH_KEY,
        },
        responseType: 'json',
    })
    return res.data
}

const iconsToPublish = lockfile.icons
    .filter(({added, updated}) => added == pkg.version || updated == pkg.version) // New icons only
    .map(({ name }) => name)
    .filter(i => !(iconsJson[i].category == 'Logos & Brands' && i !== 'Roblox')) // Remove brands
    .filter(i => !removedIcons.includes(i)) // Remove filtered icons

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

;(async () => {
    for (const iconName of iconsToPublish) {
        try {
            const data1 = await publishAsset(iconName, kebabCase(iconName))
            const { operationId } = data1

            await wait(4_000)

            async function waitForCompletion() {
                let data2
                do {
                    data2 = await getOperation(operationId)

                    if (!data2.done) {
                        console.log(
                            ansiColors.yellow('Waiting for operation to complete...')
                        )
                        await wait(4_000)
                    }
                } while (!data2.done)
                return data2
            }

            async function getAssetId() {
                const data2 = await waitForCompletion()

                const { response } = data2
                return response
            }

            const response = await getAssetId()
            assetData[iconName] = response.assetId
            console.log(ansiColors.green(`Published ${iconName}`))

            writeFileSync(iconAssetsPath, await prettierFormat(assetData))
        } catch (err) {
            console.log(ansiColors.red(`Error publishing ${iconName}:`))
            throw err
        }
    }
})().then(() => {
    console.log(ansiColors.green(`Done publishing icons!`))
})
