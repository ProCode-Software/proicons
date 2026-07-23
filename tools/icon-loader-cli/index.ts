import { readdirSync } from 'fs'
import { join, parse, resolve } from 'path'
import { styleText } from 'util'

const __PROICONS_ROOT = resolve(import.meta.dir, '../../')
type IconsJSON = Record<string, (typeof import('../../icons/icons.json'))['Add']>

const inputDir = process.argv[1]
const outFile = join(__PROICONS_ROOT, './in/in.json')
const out: IconsJSON = {}

if (!inputDir) {
    console.error('An input directory is required')
    process.exit(2)
}

for (const file of readdirSync(inputDir)) {
    const { name, ext } = parse(file)
    if (ext != '.svg') continue
    out[name] = {
        category: '',
        description: '',
        icon: await Bun.file(join(inputDir, file)).text(),
    }
}

Bun.write(outFile, JSON.stringify(out, undefined, 4))
console.log(
    styleText('greenBright', `Generated inputs for ${Object.keys(out).length} icons!`)
)
console.log(
    styleText(
        'yellowBright',
        `Be sure to add the missing categories and descriptions in ${styleText('cyanBright', outFile)}.`
    )
)
