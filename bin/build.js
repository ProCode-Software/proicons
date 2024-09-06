const fs = require('fs')
const path = require('path')
const prettier = require('prettier')
const config = require('../src/configs/tags.json')
const rename = require('./rename')
const c = require('ansi-colors')
const sharp = require('sharp');
const pixelfix = require('./pixelfix')
const { default: fixImage } = require("./pixelfix")

const strokeColors = ['#212325', 'black', '#000000']

// Move and rename SVGs
const inDir = path.join('in')
const outDir = path.join('icons/svg')
let variableIcons = []

const files = fs.readdirSync(inDir)
files.filter(file => file.endsWith('.svg')).forEach(file => {
    const oldPath = path.join(inDir, file);
    if (file.includes(' -Var')) {
        variableIcons.push(file.slice(0, -4))
    }
    const newName = rename.kebabCase(file)
    const newPath = path.join(outDir, newName);

    try {
        let ct = fs.readFileSync(oldPath, 'utf8')
        strokeColors.forEach(color => {
            ct = ct.replaceAll(color, 'currentColor')
        })
        fs.writeFileSync(newPath, ct)
        fs.unlinkSync(oldPath)
    } catch (error) {
        console.error(c.red(`Error moving file ${file}:`, error));
    }
});

console.log(c.green('Done renaming files!'))

// Build PNGs
async function buildPng() {
    const pngSizes = [24, 72, 120]
    const svgFiles = fs.readdirSync(outDir)
        .filter(file => file.endsWith('.svg'))
    for (const file of svgFiles) {
        for (const size of pngSizes) {
            const colors = ['black', 'white']
            const scale = size / 24
            const newPath = path.join(`icons/png${scale == 1 ? '' : `@${scale}x`}`)

            for (const color of colors) {
                const fileStr = fs.readFileSync(path.join(outDir, file), 'utf-8')
                    .replaceAll('currentColor', color)

                const fp = path.join(outDir, newPath, `${file.slice(0, -4)}.png`)

                await sharp(Buffer.from(fileStr))
                    .resize(size, size)
                    .png().toFile(fp)

                await fixImage(fp)
            }
        }

    }
}
try {
    await buildPng()
} catch (error) {
    console.error(error);
}

// Build SVG list
const dict = {}
Object.keys(config).forEach(friendlyName => {
    const name = rename.camelCase(friendlyName.trimEnd())
    const fn = rename.kebabCase(friendlyName.trimEnd())

    try {
        dict[name] = fs.readFileSync(path.join(outDir, `${fn}.svg`), 'utf8')
    } catch (error) {
        console.error(c.red(`Error reading file ${fn}.svg:`, error));
    }
});
buildSvgList()

async function buildSvgList() {
    try {
        const options = await prettier.resolveConfig(path.join(__dirname, '../.prettierrc'))
        options.parser = 'json'
        const formatted = await prettier.format(JSON.stringify(dict), options)

        fs.writeFileSync(path.join('src/configs/icons.json'), formatted)

        console.log('Done building SVG list!')
        console.log(c.green('Build complete!'));

        if (variableIcons.length > 0) {
            console.log(c.cyan('Variable icons:', variableIcons))
        } else {
            console.log(c.green('No newly added variable icons!'))
        }
    } catch (error) {
        console.error(c.red('Error writing icons.json:', error));
    }
}