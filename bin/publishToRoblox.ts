import ansiColors from 'ansi-colors'
import axios, { type AxiosResponse } from 'axios'
import FormData from 'form-data'
import { createReadStream, existsSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { JSDOM } from 'jsdom'
import { resolve } from 'path'
import iconsJson from '../icons/icons.json' with { type: 'json' }
import lockfile from '../icons/icons.lock.json' with { type: 'json' }
import pkg from '../package.json' with { type: 'json' }
import { prettierFormat } from './helpers/prettierFormat.ts'
import { kebabCase } from './helpers/rename.ts'

const iconAssetsPath = resolve(import.meta.dirname, '../icons/roblox.json')
const tempFilePath = resolve(import.meta.dirname, `../roblox-upload-${pkg.version}.json`)
if (!existsSync(tempFilePath)) writeFileSync(tempFilePath, '[]')

const assetData: typeof import('../icons/roblox.json') = JSON.parse(
    readFileSync(iconAssetsPath, 'utf-8') ?? '{}'
)
const uploadedIcons: Record<'icon' | 'assetId' | 'imageId', string>[] = JSON.parse(
    readFileSync(tempFilePath, 'utf-8') ?? '[]'
)
const removedIcons = assetData.exclude

if (!process.env.ROBLOX_PUBLISH_KEY)
    throw new Error(
        'You forgot your Roblox API key. Use `node --env-file=.env ./publishIcons.ts` with the variable "ROBLOX_PUBLISH_KEY"'
    )

const publishEndpoint = 'https://apis.roblox.com/assets/v1/assets',
    operationsEndpoint = 'https://apis.roblox.com/assets/v1/operations',
    assetDeliveryEndpoint = 'https://apis.roblox.com/asset-delivery-api/v1/assetId'
/* 'https://assetdelivery.roblox.com/v1/asset' */

function handleError(err) {
    class RobloxError extends Error {
        constructor(msg) {
            super(ansiColors.red(msg))
            this.name = 'RobloxError'
        }
    }
    if (!err.response) throw err
    let { code, message, errors } = err.response.data
    if (errors) ({ code, message } = errors[0])
    throw new RobloxError(`[Code ${code}] ${message}`)
}

async function publishAsset<T = {}>(iconName: string, filename: string): Promise<T> {
    const imagePath = resolve(
        import.meta.dirname,
        '../icons/png@5x/white',
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
    const { data } = (await axios
        .post(publishEndpoint, form, {
            headers: {
                ...form.getHeaders(),
                'x-api-key': process.env.ROBLOX_PUBLISH_KEY,
            },
            responseType: 'json',
        })
        .catch(handleError)) as AxiosResponse
    return data
}

async function getImageId(assetId: string) {
    const { data } = (await axios
        .get(`${assetDeliveryEndpoint}/${assetId}`, {
            headers: { 'x-api-key': process.env.ROBLOX_PUBLISH_KEY },
        })
        .catch(handleError)) as AxiosResponse

    const {
        window: { document: xmlData },
    } = new JSDOM(data)
    const imageId = xmlData
        .querySelector('.Decal content[name="Texture"] > url')
        .textContent.match(/\?id=(\d+)/)[1]

    return imageId
}

async function getOperation(operationId: string) {
    const { data } = (await axios
        .get(`${operationsEndpoint}/${operationId}`, {
            headers: {
                'x-api-key': process.env.ROBLOX_PUBLISH_KEY,
            },
            responseType: 'json',
        })
        .catch(handleError)) as AxiosResponse
    return data
}

const iconsToPublish: string[] = []
for (const [name, data] of Object.entries(lockfile.icons)) {
    const updated = (data as any).updated as string | undefined
    if (
        // New or unuploaded icons only
        (!assetData.assetPaths[name] ||
            data.added == pkg.version ||
            updated == pkg.version) &&
        // Remove brands except Roblox
        !(iconsJson[name].category == 'Logos & Brands' && name != 'Roblox') &&
        // Remove filtered icons and already uploaded icons
        !removedIcons.includes(name) &&
        !uploadedIcons.some(({ icon }) => icon == name)
    )
        iconsToPublish.push(name)
}

// Cleanup icons file
const deletedIcons = []
for (const iconName in assetData.assetPaths) {
    if (!iconsJson[iconName]) {
        deletedIcons.push(iconName)
        delete assetData.assetPaths[iconName]
    }
}
writeFileSync(iconAssetsPath, await prettierFormat(assetData))
if (deletedIcons.length > 0)
    console.log(
        ansiColors.cyan(`Removed ${deletedIcons.length} deleted icons:`),
        deletedIcons.join(', '),
        '\n'
    )

// Publish icons
console.log(ansiColors.yellow(`Publishing ${iconsToPublish.length} icons...`))

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms))

async function run() {
    for (const iconName of iconsToPublish) {
        try {
            const { operationId } = await publishAsset<{ operationId: string }>(
                iconName,
                kebabCase(iconName)
            )

            await sleep(4000)

            while (!(await getOperation(operationId)).done) {
                console.log(ansiColors.yellow('Waiting for operation to complete...'))
                await sleep(4000)
            }

            const {
                response: { assetId },
            } = await getOperation(operationId)
            const imageId = await getImageId(assetId)
            assetData.assetPaths[iconName] = imageId
            uploadedIcons.push({ icon: iconName, assetId: assetId, imageId: imageId })
            writeFileSync(iconAssetsPath, await prettierFormat(assetData))
            writeFileSync(tempFilePath, JSON.stringify(uploadedIcons, null, 4))

            console.log(
                ansiColors.green(`Published ${iconName}:`),
                ansiColors.cyan(imageId)
            )
        } catch (err) {
            console.log(ansiColors.red(`Error publishing ${iconName}:`))
            throw err
        }
    }
}

run().then(() => {
    console.log(ansiColors.bold(ansiColors.green(`Done publishing icons!`)))
    rmSync(tempFilePath)
    process.exit(0)
})
