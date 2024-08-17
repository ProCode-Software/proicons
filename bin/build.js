const fs = require('fs')
const path = require('path')
const config = require('../src/configs/tags.json')
const rename = require('./rename')
const chalk = require('cli-color')

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
        fs.renameSync(oldPath, newPath);
    } catch (error) {
        console.error(chalk.red(`Error moving file ${file}:`, error));
    }
});

console.log(chalk.green('Done renaming files!'))

// Build SVG list
const dict = {}
Object.keys(config).forEach(friendlyName => {
    const name = rename.camelCase(friendlyName.trimEnd())
    const fn = rename.kebabCase(friendlyName.trimEnd())

    try {
        dict[name] = fs.readFileSync(path.join(outDir, `${fn}.svg`), 'utf8')
    } catch (error) {
        console.error(chalk.red(`Error reading file ${fn}.svg:`, error));
    }
});
try {
    fs.writeFileSync(path.join('src/configs/icons.json'), JSON.stringify(dict))

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