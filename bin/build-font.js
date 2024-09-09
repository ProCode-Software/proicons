import { ASSET_TYPES, generateFonts, OtherAssetType } from 'fantasticon';
import { readFileSync } from "fs";

const version = JSON.parse(readFileSync('package.json', 'utf-8')).version
const lockfile = JSON.parse(readFileSync('icons/icons.lock.json', 'utf-8'))

const codepoints = {}
Object.keys(lockfile).forEach((icName, index) => {
    codepoints[icName] = 57344 + index
})

export async function buildFont() {
    generateFonts({
        name: 'ProIcons',
        outputDir: 'icons/fonts',
        inputDir: 'icons/svg',
        normalize: true,
        fontHeight: 500,
        codepoints: codepoints,
        fontTypes: [
            ASSET_TYPES.TTF,
            ASSET_TYPES.WOFF,
            ASSET_TYPES.WOFF2
        ],
        assetTypes: [
            OtherAssetType.HTML,
            OtherAssetType.CSS,
            OtherAssetType.TS,
            OtherAssetType.JSON,
        ],
        formatOptions: {
            ttf: {
                description: '',
                version: version
            },
            json: {
                indent: 4
            }
        },
    })
}