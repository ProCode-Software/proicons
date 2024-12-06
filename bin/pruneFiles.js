import lockfile from '../icons/icons.lock.json' with { type: 'json' }
import icons from '../icons/icons.json' with { type: 'json' }
import { join, resolve } from "path"
import { readdirSync, unlinkSync } from "fs"
import ansiColors from "ansi-colors"
import { kebabCase } from "./rename.js"

// Audit lockfiles
const lockfileIconNames = lockfile.icons.map(({name}) => name).sort()
const iconNames = Object.keys(icons).sort()
const isEqual = lockfileIconNames.toString() === iconNames.toString()

if (!isEqual) {
    throw new Error(ansiColors.red('icons.json and lockfile don\'t match'))
}

// Remove extra icons from folders
const iconDirs = [
    'svg',
    'png/black', 'png@3x/black', 'png@5x/black',
    'png/white', 'png@3x/white', 'png@5x/white'
]
const ROOT_DIR = resolve(import.meta.dirname, '../icons')
const extraIcons = new Set()
const extraIconPaths = new Set()

for (const dirname of iconDirs) {
    const dir = join(ROOT_DIR, dirname)
    for (const filename of readdirSync(dir)) {
        const kebabName = filename.replace(/.(?:svg|png)$/, '')
        const filePath = join(dir, filename)
        const isInLockfile = lockfileIconNames.some(name => kebabCase(name) === kebabName)
        if (!isInLockfile) {
            extraIconPaths.add(filePath)
            extraIcons.add(kebabName)
        }
    }
}
// Prompt to remove duplicates
const extraArray = Array.from(extraIcons)
console.log(
    ansiColors.bold(
        ansiColors.yellow(`\nThere are ${ansiColors.cyan(extraArray.length)} extraneous icons in folders. Do you want to remove them?`)
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