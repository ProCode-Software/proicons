import { resolve } from 'path'
import icons from '../../../icons/icons.json' with { type: 'json' }
import lockfile from '../../../icons/icons.lock.json' with { type: 'json' }
import { fileURLToPath } from 'url'
import { pascalCase } from '../../../bin/rename.js'
import iconIds from '../dist/assetPaths.json' with { type: 'json' }
import { readFileSync, writeFileSync } from 'fs'

const __dirname = import.meta.dirname

const includedBrands = ['Roblox'] // All brand icons removed by default
const removedKeyWords = ['die', 'kill', 'death', 'x premium', 'twitter blue'] // For tags

removedKeyWords.push(
    ...Object.entries(icons)
        .filter(([, { category }]) => category == 'Logos & Brands')
        .map(([friendlyName]) => friendlyName)
)

const excludedIcons = readFileSync(
    resolve(__dirname, '../removed-icons.txt'),
    'utf-8'
).split('\n')

const outputFile = resolve(__dirname, '../src/icons.luau')

const entries = Object.entries(icons)
    .map(([friendlyName, { description, category }]) => {
        if (!iconIds[friendlyName]) return
        if (category == 'Logos & Brands' && !includedBrands.includes(friendlyName)) return
        if (excludedIcons.includes(friendlyName)) return

        const hasTags = description.length
        const tagStrings = description
            .split(',')
            .filter(d => !removedKeyWords.includes(d.trim().toLowerCase()))
            .map(d => JSON.stringify(d.trim()))

        // TODO: add icon IDs
        return `${pascalCase(friendlyName)} = {
    id = ${iconIds[friendlyName]},
    category = ${JSON.stringify(category)}${hasTags ? `,\n    tags = { ${tagStrings.join(', ')} }` : ''}
}`.replaceAll('\n', '\n    ')
    })
    .filter(m => m)

const template = `return {
    ${entries.join(',\n    ')}
}`

writeFileSync(outputFile, template)
console.log(`\nCreated icons file at ${outputFile}\n`)
