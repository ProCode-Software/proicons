import { writeFileSync } from 'fs'
import { resolve } from 'path'
import lockfile from '../icons/icons.lock.json' with { type: 'json' }
import pkg from '../package.json' with { type: 'json' }
import { kebabCase } from '../tools/shared/shared.ts'
const { version } = pkg

const shouldWrite = process.argv.includes('-w') || process.argv.includes('--write')
const __rootdir = resolve(import.meta.dirname, '../')

export function generateChangelog() {
    const newIcons: string[] = []
    const updatedIcons: string[] = []
    const renamedIcons: string[] = []

    //@ts-ignore
    for (const [name, { added, updated }] of Object.entries(lockfile.icons)) {
        if (added == version) {
            newIcons.push(name)
        } else if (updated == version) {
            const [renamedAlias] =
                Object.entries(lockfile.aliases).find(([, v]) => v == name) ?? []
            if (renamedAlias) renamedIcons.push(`${renamedAlias} → ${name}`)
            else updatedIcons.push(name)
        }
    }

    const toListItem = (n: string) => {
        const name = n.replace(/(.+) → (.+)/, '$2')
        const kebabName = kebabCase(name)
        return `
<li>
    <img src="https://raw.githubusercontent.com/ProCode-Software/proicons/main/icons/png@3x/white/${kebabName}.png#gh-dark-mode-only" width="24">
    <img src="https://raw.githubusercontent.com/ProCode-Software/proicons/main/icons/png@3x/black/${kebabName}.png#gh-light-mode-only" width="24">
    ${n}
</li>`.trim()
    }

    let changelog = ``
    if (newIcons.length) {
        changelog += `## New icons\n<ul>\n${newIcons.map(toListItem).join('\n')}\n</ul>`
    }
    if (renamedIcons.length) {
        changelog += `\n\n## Renamed icons\n<ul>\n${renamedIcons.map(toListItem).join('\n')}\n</ul>`
    }
    if (updatedIcons.length) {
        changelog += `\n\n## Updated icons\n<ul>\n${updatedIcons.map(toListItem).join('\n')}\n</ul>`
    }

    console.log(changelog)

    if (shouldWrite) {
        const changelogPath = resolve(__rootdir, 'CHANGELOG.md')
        writeFileSync(changelogPath, changelog)
        console.log(`\n\x1B[32mWritten changelog to ${changelogPath}!\x1B[m`)
    }
    return changelog
}
generateChangelog()
