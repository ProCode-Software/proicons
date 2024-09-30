import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, writeFileSync } from "fs";
import path from "path";
import rename from './rename.js'
import { FontAssetType, generateFonts, OtherAssetType } from '@twbs/fantasticon';
import { patch } from "../tools/dep-patch/index.js";
import ansiColors from "ansi-colors";
import SVGFixer from 'oslllo-svg-fixer';

const version = JSON.parse(readFileSync('package.json', 'utf-8')).version
const lockfile = JSON.parse(readFileSync('icons/icons.lock.json', 'utf-8'))

const codepoints = {}
lockfile.icons.forEach((obj, index) => {
    codepoints[rename.kebabCase(obj.name)] = 57344 + index
})

const metadata = `<?xml-model href="https://www.w3.org/TR/WOFF/metadata/woffmeta.rng"?>
<metadata version="1.0">
    <description>
        <text>Modern and open-source icons, designed by ProCode-Software</text>
    </description>
    <license id="MIT" url="https://github.com/ProCode-Software/proicons/blob/main/LICENSE">
        <text>MIT License</text>
    </license>
    <vendor name="ProCode Software" url="https://procode-software.github.io/proicons"></vendor>
</metadata>`

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
            templates: {
                html: path.resolve('tools/data/html-font.hbs')
            },
            fontTypes: [
                FontAssetType.TTF,
                FontAssetType.WOFF,
                FontAssetType.WOFF2,
                FontAssetType.EOT,
            ],
            assetTypes: [
                OtherAssetType.HTML,
                OtherAssetType.CSS,
                OtherAssetType.JSON
            ],
            formatOptions: {
                ttf: {
                    description: 'Modern and open-source icons, designed by ProCode-Software',
                    version: version.slice(0, -2),
                    url: 'https://procode-software.github.io/proicons',
                    copyright: '©2024 ProCode Software',
                },
                woff: { metadata },
                json: { indent: 4 },
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