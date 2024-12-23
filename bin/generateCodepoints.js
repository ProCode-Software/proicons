import { writeFileSync } from 'fs'
import lockfile from '../icons/icons.lock.json' with { type: 'json' }
import { resolve } from 'path'
import { kebabCase } from './helpers/rename.js'
import { readFileSync } from 'fs'

const __dirname = import.meta.dirname
const codepointsPath = resolve(__dirname, '../icons/fonts/ProIcons.json')

const codepoints = JSON.parse(readFileSync(codepointsPath, 'utf-8') ?? '{}')

for (const [i, { name }] of lockfile.icons.entries()) {
    const kebabName = kebabCase(name)
    if (!(kebabName in codepoints)) {
        codepoints[kebabName] = 0xE000 + i
    }
}

writeFileSync(codepointsPath, JSON.stringify(codepoints, undefined, 4))
