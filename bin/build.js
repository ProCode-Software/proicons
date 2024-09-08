import { readdirSync, readFileSync, writeFileSync, unlinkSync } from 'fs'
import path from 'path'
import { resolveConfig, format } from 'prettier'
import config from '../src/configs/tags.json' with { type: "json" }
import rename from './rename.js'
import pixelfix from './pixelfix.js'
import chalk from 'ansi-colors'
import sharp from 'sharp'
import { optimize } from 'svgo'
import progress from "progress"

const strokeColors = ['#212325', 'black', '#000000']
const svgoConfig = {
    multipass: true,
    plugins: [
        {
            name: 'preset-default',
            params: {
                overrides: {
                    removeViewBox: false,
                    inlineStyles: {
                        onlyMatchedOnce: false,
                    },
                },
            },
        },
    ],
}

// Move and rename SVGs
const inDir = path.join('in')
const outDir = path.join('icons/svg')
let variableIcons = []

const files = readdirSync(inDir)
files.filter(file => file.endsWith('.svg')).forEach(file => {
    const oldPath = path.join(inDir, file);
    if (file.includes(' -Var')) {
        variableIcons.push(file.slice(0, -4))
    }
    const newName = rename.kebabCase(file)
    const newPath = path.join(outDir, newName);

    try {
        let ct = optimize(readFileSync(oldPath, 'utf8'), svgoConfig)
        strokeColors.forEach(color => {
            ct = ct.replaceAll(color, 'currentColor')
        })
        writeFileSync(newPath, ct)
        unlinkSync(oldPath)
    } catch (error) {
        console.error(chalk.red(`Error moving file ${file}:`, error));
    }
});

console.log(chalk.green('Done renaming files!'))

// Build PNGs
const buildPngs = async () => {
    const pngSizes = [24, 72, 120]
    const svgFiles = readdirSync(outDir)
        .filter(file => file.endsWith('.svg'))

    const progresBar = new progress('  Build PNGs [:bar] :item :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: svgFiles.length,
    })

    for (const file of svgFiles) {
        for (const size of pngSizes) {
            const colors = ['black', 'white']
            const scale = size / 24
            const newFolder = path.join(`icons/png${scale == 1 ? '' : `@${scale}x`}`)

            for (const color of colors) {
                const fileStr = readFileSync(path.join(outDir, file), 'utf-8')
                    .replaceAll('currentColor', color)

                const newFilePath = path.join(newFolder, `${file.slice(0, -4)}.png`)

                progresBar.tick(1, {
                    item: newFilePath
                })

                await sharp(Buffer.from(fileStr))
                    .resize(size, size)
                    .png().toFile(newFilePath)

                await pixelfix(newFilePath)
            }
        }

    }
    progresBar.terminate()
    console.log(chalk.green('Done building PNGs!'));
}
buildPngs()

// Build SVG list
const dict = {}
Object.keys(config).forEach(friendlyName => {
    const name = rename.camelCase(friendlyName.trimEnd())
    const fn = rename.kebabCase(friendlyName.trimEnd())

    try {
        dict[name] = readFileSync(path.join(outDir, `${fn}.svg`), 'utf8')
    } catch (error) {
        console.error(chalk.red(`Error reading file ${fn}.svg:`, error));
    }
});
buildSvgList()

async function buildSvgList() {
    try {
        const options = await resolveConfig(path.join(__dirname, '../.prettierrc'))
        options.parser = 'json'
        const formatted = await format(JSON.stringify(dict), options)

        writeFileSync(path.join('src/configs/icons.json'), formatted)

        console.log('Done building SVG list!')
        console.log(chalk.green('Build complete!'));

        if (variableIcons.length > 0) {
            console.log(chalk.cyan('Variable icons:', variableIcons))
        } else {
            console.log(chalk.green('No newly added variable icons!'))
        }
    } catch (error) {
        console.error(chalk.red('Error writing icons.json:', error));
    }
}