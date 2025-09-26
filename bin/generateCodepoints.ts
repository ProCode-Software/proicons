import { writeFileSync } from 'fs'
import lockfile from '../icons/icons.lock.json' with { type: 'json' }
import { resolve } from 'path'
import { kebabCase } from './helpers/rename.ts'
import { readFileSync } from 'fs'
import ansiColors from 'ansi-colors'

const __dirname = import.meta.dirname
const codepointsPath = resolve(__dirname, '../icons/fonts/ProIcons.json')

const codepoints: Record<string, number> = JSON.parse(
    readFileSync(codepointsPath, 'utf-8') ?? '{}'
)

let nextCodepoint = Math.max(...Object.values(codepoints)) + 1

for (const name in lockfile.icons) {
    const kebabName = kebabCase(name)
    const oldIcon: string | undefined = lockfile.aliases[name]
    if (!(kebabName in codepoints)) {
        if (oldIcon) {
            const kebabAlias = kebabCase(oldIcon)
            codepoints[kebabName] = codepoints[kebabAlias]
            delete codepoints[kebabAlias]
        } else codepoints[kebabName] = nextCodepoint++
    }
}
const kebabNames = Object.keys(lockfile.icons).map(kebabCase)

// Cleanup codepoints
for (const key in codepoints) {
    if (!kebabNames.includes(key)) delete codepoints[key]
}

writeFileSync(codepointsPath, JSON.stringify(codepoints, undefined, 4))
console.log(ansiColors.green('Successfully added font codepoints!'))
