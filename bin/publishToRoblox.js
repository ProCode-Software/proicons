import axios from 'axios'
import lockfile from '../icons/icons.lock.json' with { type: 'json' }
import pkg from '../package.json' with { type: 'json' }
import iconsJson from '../icons/icons.json' with { type: 'json' }
import FormData from 'form-data'
import { createReadStream, writeFileSync, readFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import { kebabCase } from './helpers/rename.js'
import { prettierFormat } from './helpers/prettierFormat.js'
import ansiColors from 'ansi-colors'
import { existsSync } from 'fs'

const iconAssetsPath = resolve(import.meta.dirname, '../icons/roblox.json')
const tempFilePath = resolve(import.meta.dirname, `../../roblox-upload-${pkg.version}.json`)
if (!existsSync(tempFilePath)) writeFileSync(tempFilePath, '[]')

/** @type {import('../icons/roblox.json')} */
const assetData = JSON.parse(readFileSync(iconAssetsPath, 'utf-8') ?? '{}')
/** @type {string[]} */
const uploadedIcons = JSON.parse(readFileSync(tempFilePath, 'utf-8') ?? '[]')

const removedIcons = assetData.exclude

if (!process.env.ROBLOX_PUBLISH_KEY)
    throw new Error(
        'You forgot your Roblox API key. Use `node --env-file=.env ./publishIcons.js` with the variable "ROBLOX_PUBLISH_KEY"'
    )

const endpoints = {
    publish: 'https://apis.roblox.com/assets/v1/assets',
    operations: oid => `https://apis.roblox.com/assets/v1/operations/${oid}`
}

function handleError({ err: { response: { data: { code, message } } } }) {
    class RobloxError extends Error {
        constructor(message) {
            super(ansiColors.red(message))
            this.name = 'RobloxError'
        }
    }
    throw new RobloxError(`[${code}] ${message}`)
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
    const { data } = await axios.post(endpoints.publish, form, {
        headers: {
            ...form.getHeaders(),
            'x-api-key': process.env.ROBLOX_PUBLISH_KEY,
        },
        responseType: 'json',
    }).catch(handleError)

    return data
}

async function getOperation(operationId) {
    const { data } = await axios.get(endpoints.operations(operationId), {
        headers: {
            'x-api-key': process.env.ROBLOX_PUBLISH_KEY,
        },
        responseType: 'json',
    }).catch(handleError)
    return data
}

const iconsToPublish = lockfile.icons
    .filter(({ added, updated }) => added == pkg.version || updated == pkg.version) // New icons only
    .map(({ name }) => name)
    .filter(i => !(iconsJson[i].category == 'Logos & Brands' && i !== 'Roblox')) // Remove brands
    .filter(i => !removedIcons.includes(i) && !uploadedIcons.includes(i)) // Remove filtered icons and already uploaded icons

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

console.log(ansiColors.yellow(`Publishing ${iconsToPublish.length} icons...`));

(async () => {
    for (const iconName of iconsToPublish) {
        try {
            const { operationId } = await publishAsset(iconName, kebabCase(iconName))

            // Waiting is required due to Roblox rate limits
            await wait(4000)

            while (!(await getOperation(operationId)).done) {
                console.log(
                    ansiColors.yellow('Waiting for operation to complete...')
                )
                await wait(4000)
            }

            const { response: { assetId } } = await getOperation(operationId)
            assetData.assetPaths[iconName] = assetId
            writeFileSync(iconAssetsPath, await prettierFormat(assetData))

            console.log(
                ansiColors.green(`Published ${iconName}:`), ansiColors.cyan(assetId)
            )
        } catch (err) {
            console.log(ansiColors.red(`Error publishing ${iconName}:`))
            throw err
        }
    }
})().then(() => {
    console.log(ansiColors.green(`Done publishing icons!`))
})
