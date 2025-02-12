import { writeFileSync } from 'fs'
import { resolve } from 'path'
import lockfile from '../icons/icons.lock.json' with { type: 'json' }
import pkg from '../package.json' with { type: 'json' }
import { kebabCase } from './helpers/rename.js'
const { version } = pkg

const shouldWrite = process.argv.includes('--write') || process.argv.includes('-w')
const __rootdir = resolve(import.meta.dirname, '../')

export function generateChangelog() {
    const newIcons = []
    const updatedIcons = []

    for (const { name, added, updated } of lockfile.icons) {
        if (added == version) {
            newIcons.push(name)
        } else if (updated == version) {
            updatedIcons.push(name)
        }
    }

    const toListItem = name => `
<li>
    <img src="https://raw.githubusercontent.com/ProCode-Software/proicons/main/icons/png@3x/white/${kebabCase(name)}.png#gh-dark-mode-only" width="24">
    <img src="https://raw.githubusercontent.com/ProCode-Software/proicons/main/icons/png@3x/black/${kebabCase(name)}.png#gh-light-mode-only" width="24">
    ${name}
</li>`.trim()

    let changelog = ``
    if (newIcons.length) {
        changelog += `## New icons\n<ul>${newIcons.map(toListItem).join('\n')}</ul>`
    }
    if (updatedIcons.length) {
        changelog += `\n\n## Updated icons\n<ul>${updatedIcons.map(toListItem).join('\n')}</ul>`
    }

    console.log(changelog)

    if (shouldWrite) {
        const changelogPath = resolve(__rootdir, 'CHANGELOG.md')
        writeFileSync(changelogPath, changelog)
        console.log(`\nWritten changelog to ${changelogPath}!\n`)
    }

    return changelog
}
generateChangelog()
