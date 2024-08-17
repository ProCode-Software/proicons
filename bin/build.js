const fs = require('fs')
const path = require('path')
const config = require('../src/configs/tags.json')
const rename = require('./rename')
const chalk = require('cli-color')

// Move and rename SVGs
const inDir = path.join('in')
const outDir = path.join('icons/svg')
let variableIcons = []

fs.readdir(inDir, (err, files) => {
    if (err) throw err
    files.filter(file => file.endsWith('.svg')).forEach(file => {
        const oldPath = path.join(inDir, file);
        if (file.includes(' -Var')) {
            variableIcons.push(file.slice(0, -4))
        }
        const newName = rename.kebabCase(file)
        const newPath = path.join(outDir, newName);

        fs.rename(oldPath, newPath, err => {
            if (err) {
                console.error(chalk.red(`Error moving file ${file}:`, err));
            }
        });
    });
    console.log(chalk.green('Done renaming files!'))
    buildSvgList()
})

// Build SVG list
async function buildSvgList() {
    const dict = {}
    Object.keys(config).forEach(async icn => {
        const name = rename.camelCase(icn)
        const fn = rename.kebabCase(icn.trimEnd())
        dict[name] = fs.readFile(path.join(outDir, `${fn}.svg`), 'utf8', (err, data) => {
            if (err) throw err
            return data
        })
    });
    fs.writeFile(path.join('src/configs/icons.json'), JSON.stringify(dict), err => {
        if (err) throw err
        console.log('Done building SVG list!')
        console.log(chalk.green('Build complete!'));
        console.log(chalk.cyan('Variable icons:', variableIcons || 'none'))
    })
}