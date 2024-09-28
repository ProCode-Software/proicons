import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, writeFileSync } from "fs";
import path, { resolve } from "path";
import rename from './rename.js'
import { ASSET_TYPES, generateFonts, OtherAssetType } from '@twbs/fantasticon';
import { patch } from "../tools/dep-patch/index.js";
import ansiColors from "ansi-colors";
import SVGFixer from 'oslllo-svg-fixer';

const version = JSON.parse(readFileSync('package.json', 'utf-8')).version
const lockfile = JSON.parse(readFileSync('icons/icons.lock.json', 'utf-8'))

const codepoints = {}
lockfile.forEach((obj, index) => {
    codepoints[obj.name] = 57344 + index
})

// Patch dependencies if needed
patch()

async function outlineSvgs() {
    const inputDir = path.resolve('./icons/svg'), outputDir = path.resolve('./_outlined')
    try {
        if (!existsSync(outputDir)) {
            mkdirSync(outputDir)

            await SVGFixer(inputDir, outputDir, {
                showProgressBar: true,
                traceResolution: 800,
            }).fix()

            for (const fn of readdirSync(outputDir)) {
                //fix
                const p = resolve(outputDir, fn)

                const normalCase = lockfile.find(
                    (lfItem) => rename.kebabCase(lfItem.name) == fn.slice(0, -4)
                )['name']

                renameSync(p, resolve(outputDir, normalCase + '.svg'))
            }

            console.log(ansiColors.green('Done outlining svgs!'));
        } else {
            console.log(ansiColors.green('SVGs are already outlined, skipped'));
        }
    } catch (err) {
        console.log(ansiColors.red('Error outlining svgs:'));
        throw new Error(err);
    }
}

export async function buildFont() {
    try {
        await outlineSvgs()
        
        await generateFonts({
            name: 'ProIcons',
            outputDir: path.resolve('./icons/fonts/'),
            inputDir: path.resolve('./_outlined/'),
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
            prefix: 'proicon',
        })

        console.log(ansiColors.green('Done building fonts!'));

    } catch (err) {
        console.log(ansiColors.red('Error building fonts:'));
        throw new Error(err);
    }
}

buildFont()