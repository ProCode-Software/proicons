import { readFileSync, writeFileSync } from "fs";
import path from "path";
import rename from './rename.js'
import { ASSET_TYPES, generateFonts, OtherAssetType } from '@twbs/fantasticon';

const version = JSON.parse(readFileSync('package.json', 'utf-8')).version
const lockfile = JSON.parse(readFileSync('icons/icons.lock.json', 'utf-8'))

const codepoints = {}
lockfile.forEach((obj, index) => {
    codepoints[obj.name] = 57344 + index
})

export async function buildFont() {
    await generateFonts({
        name: 'ProIcons',
        outputDir: path.resolve('./icons/fonts/'),
        inputDir: path.resolve('./icons/svg/'),
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
            OtherAssetType.JSON,
        ],
        formatOptions: {
            ttf: {
                description: 'Modern and open-source icons, designed by ProCode-Software',
                version: version.slice(0, -2),
                url: 'https://procode-software.github.io/proicons',
                copyright: '©2024 ProCode Software',
            },
            woff: {
                metadata: readFileSync('icons/fonts/metadata.xml', 'utf-8'),
            },
            json: {
                indent: 4
            },
        },
        getIconId: ({
            basename
        }) => rename.kebabCase(basename),
        prefix: 'proicon',
    })
}

buildFont()