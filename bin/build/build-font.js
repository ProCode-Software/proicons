import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, writeFileSync } from "fs";
import path from "path";
import * as rename from '../helpers/rename.js'
import { FontAssetType, generateFonts, OtherAssetType } from '@twbs/fantasticon';
import ansiColors from "ansi-colors";
import SVGFixer from 'oslllo-svg-fixer';
import codepoints from '../../icons/fonts/ProIcons.json' with { type: 'json' }
import { execSync } from "child_process";

const version = JSON.parse(readFileSync('package.json', 'utf-8')).version
const lockfile = JSON.parse(readFileSync('icons/icons.lock.json', 'utf-8'))

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

async function outlineSvgs(rebuild) {
    const inputDir = path.resolve('./icons/svg')
    const outputDir = path.resolve('./_outlined')
    const needsBuilding = rebuild || !existsSync(outputDir)

    try {
        if (needsBuilding) {
            if (!existsSync(outputDir)) mkdirSync(outputDir)

            await SVGFixer(inputDir, outputDir, {
                showProgressBar: true,
                traceResolution: 800,
            }).fix()

            console.log(ansiColors.green('Done outlining SVGs!'));
        } else {
            console.log(ansiColors.green('SVGs are already outlined, skipped'));
        }
    } catch (err) {
        console.log(ansiColors.red('Error outlining SVGs:'));
        throw new Error(err);
    }
}

/** @param {boolean} rebuild If --rebuild flag was used */
export async function buildFont(rebuild) {
    try {
        console.log(execSync('pnpm run font:codepoints').toString('utf-8'))
        await outlineSvgs(rebuild)

        await generateFonts({
            name: 'ProIcons',
            outputDir: path.resolve('./icons/fonts/'),
            inputDir: path.resolve('./_outlined/'),
            normalize: true,
            fontHeight: 500,
            codepoints,
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
            ],
            formatOptions: {
                ttf: {
                    description: 'Modern and open-source icons, designed by ProCode-Software',
                    version: version.slice(0, -2),
                    url: 'https://procode-software.github.io/proicons',
                    copyright: `©${new Date().getFullYear()} ProCode Software`,
                },
                woff: { metadata },
            },
            prefix: 'proicon',
        })

        console.log(ansiColors.green('Done building fonts!'));

    } catch (err) {
        console.log(ansiColors.red('Error building fonts:'));
        throw new Error(err);
    }
}