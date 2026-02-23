import { FontAssetType, generateFonts, OtherAssetType } from 'fantasticon'
import ansiColors from 'ansi-colors'
import { execSync } from 'child_process'
import { existsSync, mkdirSync, readFileSync } from 'fs'
import SVGFixer from 'oslllo-svg-fixer'
import path from 'path'
import codepoints from '../../icons/fonts/ProIcons.json' with { type: 'json' }

const version = JSON.parse(readFileSync('package.json', 'utf-8')).version

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

async function outlineSvgs(rebuild: boolean) {
    const inputDir = path.resolve('./icons/svg')
    const outputDir = path.resolve('./_outlined')
    const needsBuilding = rebuild || !existsSync(outputDir)

    try {
        if (!needsBuilding) {
            console.log(ansiColors.green('SVGs are already outlined, skipped'))
            return
        }
        if (!existsSync(outputDir)) mkdirSync(outputDir)

        await SVGFixer(inputDir, outputDir, {
            showProgressBar: true,
            traceResolution: 800,
        }).fix()

        console.log(ansiColors.green('Done outlining SVGs!'))
    } catch (err) {
        console.log(ansiColors.red('Error outlining SVGs:'))
        throw err
    }
}

/** @param {boolean} rebuild If --rebuild flag was used */
export async function buildFont(rebuild: boolean) {
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
                html: path.resolve('./bin/build/templates/codepoints.hbs'),
            },
            fontTypes: [
                FontAssetType.TTF,
                FontAssetType.WOFF,
                FontAssetType.WOFF2,
                FontAssetType.EOT,
            ],
            assetTypes: [OtherAssetType.HTML, OtherAssetType.CSS],
            formatOptions: {
                ttf: {
                    description:
                        'Modern and open-source icons, designed by ProCode-Software',
                    version: version.slice(0, -2),
                    url: 'https://procode-software.github.io/proicons',
                    copyright: `©${new Date().getFullYear()} ProCode Software`,
                },
                woff: { metadata },
            },
            prefix: 'proicon',
        })

        console.log(ansiColors.green('Done building fonts!'))
    } catch (err) {
        console.log(ansiColors.red('Error building fonts:'))
        throw err
    }
}
