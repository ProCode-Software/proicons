import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import lockfile from '../icons/icons.lock.json' with { type: 'json' }
import pkg from '../package.json' with { type: 'json' }
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

    let changelog = ``
    if (newIcons.length) {
        changelog += `## New icons\n${newIcons.map(s => `- ${s}`).join('\n')}`
    }
    if (updatedIcons.length) {
        changelog += `\n\n## Updated icons\n${updatedIcons.map(s => `- ${s}`).join('\n')}`
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
