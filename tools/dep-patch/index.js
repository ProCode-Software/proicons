import { readFileSync, writeFileSync } from "fs"
import config from './patches.json' assert { type: 'json' }
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function patch() {
    const patches = config.patches
    for (const patch of patches) {
        const inputUrl = resolve(__dirname, 'patches', patch.input)
        try {
            const fileText = readFileSync(inputUrl, 'utf-8')
            const target = resolve(__dirname, '../../node_modules', patch.output)

            writeFileSync(target, fileText)

            console.log(`Successfully patched file ${inputUrl} in ${target}`);
        } catch (err) {
            console.error(`dep-patch: Couldn't patch file '${inputUrl}'`, err);
        }
    }
}
patch()
