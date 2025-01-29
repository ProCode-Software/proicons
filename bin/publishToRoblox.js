import axios from 'axios'
import lockfile from '../icons/icons.lock.json' with { type: 'json' }
import pkg from '../package.json' with { type: 'json' }
import iconsJson from '../icons/icons.json' with { type: 'json' }
import FormData from 'form-data'
import { createReadStream, writeFileSync, readFileSync, existsSync, rmSync } from 'fs'
import { resolve } from 'path'
import { kebabCase } from './helpers/rename.js'
import { prettierFormat } from './helpers/prettierFormat.js'
import ansiColors from 'ansi-colors'

const iconAssetsPath = resolve(import.meta.dirname, '../icons/roblox.json')
const tempFilePath = resolve(import.meta.dirname, `../roblox-upload-${pkg.version}.json`)
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

const publishEndpoint = 'https://apis.roblox.com/assets/v1/assets'
const operationsEndpoint = 'https://apis.roblox.com/assets/v1/operations'
const assetDeliveryEndpoint = 'https://assetdelivery.roblox.com/v1/asset'

function handleError(error) {
    class RobloxError extends Error {
        constructor(message) {
            this.name = 'RobloxError'
            super(ansiColors.red(message))
        }
    }
    if (!error.response) throw error
    const { code, message, errors } = error.response.data
    if (errors) {
        throw new RobloxError(errors[0].message)
    }
    throw new RobloxError(`[${code}] ${message}`)
}

async function publishAsset(iconName, filename) {
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
    const { data } = await axios.post(publishEndpoint, form, {
        headers: {
            ...form.getHeaders(),
            'x-api-key': process.env.ROBLOX_PUBLISH_KEY,
        },
        responseType: 'json',
    }).catch(handleError)

    return data
}

async function getImageId(assetId) {
    const { data } = await axios.get(`${assetDeliveryEndpoint}/?id=${assetId}`).catch(handleError)
    const parser = new DOMParser()
    const imageId = parser.parseFromString(data, 'text/xml').querySelector('.Decal Content[name="Texture"] > url').textContent.replace(/.*?\?id=/, '')
    return imageId
}

async function getOperation(operationId) {
    const { data } = await axios.get(`${operationsEndpoint}/${operationId}`, {
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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

console.log(ansiColors.yellow(`Publishing ${iconsToPublish.length} icons...`));

(async () => {
    for (const iconName of iconsToPublish) {
        try {
            const { operationId } = await publishAsset(iconName, kebabCase(iconName))

            // Waiting is required due to Roblox rate limits
            await sleep(4000)

            while (!(await getOperation(operationId)).done) {
                console.log(
                    ansiColors.yellow('Waiting for operation to complete...')
                )
                await sleep(4000)
            }

            const { response: { assetId } } = await getOperation(operationId)
            const imageId = await getImageId(assetId)
            assetData.assetPaths[iconName] = imageId
            uploadedIcons.push(iconName)
            writeFileSync(iconAssetsPath, await prettierFormat(assetData))
            writeFileSync(tempFilePath, await prettierFormat(iconAssetsPath))

            console.log(
                ansiColors.green(`Published ${iconName}:`), ansiColors.cyan(imageId)
            )
        } catch (err) {
            console.log(ansiColors.red(`Error publishing ${iconName}:`))
            throw err
        }
    }
})().then(() => {
    console.log(ansiColors.bold(ansiColors.green(`Done publishing icons!`)))
    rmSync(tempFilePath)
    process.exit(0)
})
