import lockfile from '../icons/icons.lock.json' with { type: 'json' }
import icons from '../icons/icons.json' with { type: 'json' }
import { join, resolve } from "path"
import { existsSync, readdirSync, unlinkSync } from "fs"
import ansiColors from "ansi-colors"
import { kebabCase } from "./helpers/rename.js"

// Audit lockfiles
const missingNamesInLockfile = []
const missingNamesInIcons = []
for (const icon of lockfile.icons) {
    if (!icons[icon.name]) {
        missingNamesInIcons.push(icon.name)
    }
}
for (const name of Object.keys(icons)) {
    if (!lockfile.icons.some(({ name: n }) => n === name)) {
        missingNamesInLockfile.push(name)
    }
}
if (missingNamesInLockfile.length || missingNamesInIcons.length) {
    const mapMissing = (name, arr) => `\t${name} is missing: ${arr.join(', ')}`

    const missingNames = [
        missingNamesInIcons.length ? mapMissing('icons.json', missingNamesInIcons) : '',
        missingNamesInLockfile.length ? mapMissing('Lockfile', missingNamesInLockfile) : ''
    ].filter(Boolean).join('\n')

    throw new Error(
        ansiColors.red(
            ansiColors.bold(`\nicons.json and lockfile don't match:\n`) + missingNames
        )
    )
}

// Remove extra icons from folders
const iconDirs = [
    'svg',
    'png/black', 'png@3x/black', 'png@5x/black',
    'png/white', 'png@3x/white', 'png@5x/white'
]
const ROOT_DIR = resolve(import.meta.dirname, '../icons')
const extraIconNames = new Set()
const extraIconPaths = []

for (const icon in icons) {
    for (const dir of iconDirs) {
        if (!existsSync(join(ROOT_DIR, dir, `${kebabCase(icon)}.${dir.slice(0, 3)}`))) {
            throw new Error(`Files are out of sync: '${icon}' is missing in 'icons/${dir}'`)
        }
    }
}
for (const dirname of iconDirs) {
    const dir = join(ROOT_DIR, dirname)
    for (const filename of readdirSync(dir)) {
        const kebabName = filename.replace(/.(?:svg|png)$/, '')
        const filePath = join(dir, filename)
        const isInLockfile = lockfile.icons.some(({name}) => kebabCase(name) === kebabName)
        if (!isInLockfile) {
            extraIconPaths.push(filePath)
            extraIconNames.add(kebabName)
        }
    }
}

// Prompt to remove duplicates
const extraArray = Array.from(extraIconNames)
if (!extraArray.length) {
    console.log(ansiColors.green('No extraneous icons found'))
    process.exit(0)
}
console.log(
    ansiColors.bold(
        ansiColors.yellow(`\nThere are ${ansiColors.cyan(extraArray.length.toString())} extraneous icons in folders. Do you want to remove them?`)
    )
    + ansiColors.dim(' (y/n)')
    + `\nIcons: `
    + ansiColors.cyan(extraArray.join(', '))
    + '\n'
);

process.stdin.on('data', (data) => {
    if (data.toString().toLowerCase().trim() === 'y' || data.toString().trim() == '') {
        for (const filePath of extraIconPaths) {
            unlinkSync(filePath)
        }
        console.log(ansiColors.green(`Removed ${extraArray.length} icon(s)`));
        process.exit(0)
    } else {
        console.log(ansiColors.red('Aborted'))
        process.exit(1)
    }
})