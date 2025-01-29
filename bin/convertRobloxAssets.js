import { resolve } from 'path'
import { readFileSync, writeFileSync } from "fs"
import { JSDOM } from 'jsdom'
import { prettierFormat } from './helpers/prettierFormat.js'
const iconAssetsPath = resolve(import.meta.dirname, '../icons/roblox.json')
const assetData = JSON.parse(readFileSync(iconAssetsPath, 'utf-8') ?? '{}')

const assetDeliveryEndpoint = 'https://assetdelivery.roblox.com/v1/asset'
for (const [name, assetId] of Object.entries(assetData.assetPaths)) {
    fetch(`${assetDeliveryEndpoint}/?id=${assetId}`).then(async (resp) => {
        const data = await resp.text()
        const dom = new JSDOM(data)
        if (dom.window.document.body.innerHTML.startsWith('{')) {
            throw new Error(`Failed to fetch: ${JSON.parse(dom.window.document.body.innerHTML ?? '{}')?.errors?.[0]?.message}`)
        }
        const imageId = dom.window.document.querySelector('.Decal Content[name="Texture"] > url').textContent.replace(/.*?\?id=/, '')
        assetData.assetPaths[name] = imageId
        writeFileSync(iconAssetsPath, await prettierFormat(assetData))
    })
}