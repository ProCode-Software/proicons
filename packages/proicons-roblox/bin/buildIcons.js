import { resolve } from 'path'
import icons from '../../../icons/icons.json' with { type: 'json' }
import lockfile from '../../../icons/icons.lock.json' with { type: 'json' }
import { fileURLToPath } from 'url'
import { pascalCase } from '../../../bin/rename.js'
import { writeFileSync } from 'fs'

const __dirname = import.meta.dirname

const outputFile = resolve(__dirname, '../src/icons.luau')

const entries = Object.entries(icons).map(
    ([friendlyName, { description, category }]) => {
        const hasTags = description.length
        const tagStrings = description.split(',').map(d => JSON.stringify(d.trim()))

        // TODO: add icon IDs
        return `${pascalCase(friendlyName)} = {
    category = ${JSON.stringify(category)}${hasTags ? `,\n    tags = { ${tagStrings.join(', ')} }` : ''}
}`.replaceAll('\n', '\n    ')
    }
)

const template = `return {
    ${entries.join(',\n    ')}
}`

writeFileSync(outputFile, template)
console.log(`\nCreated icons file at ${outputFile}\n`)
