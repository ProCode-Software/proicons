import { readFileSync, writeFileSync } from "fs"
import config from './patches.json' assert { type: 'json' }
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"
import ansiColors from "ansi-colors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** Patches dependencies from config */
export function patch() {
    const patches = config.patches
    if (!patches.filter((p) => p.enabled).length) {
        console.log(ansiColors.yellow('No patches defined'));
    } else {
        for (const patchItem of patches) {
            if (patchItem.enabled) {
                const inputUrl = resolve(__dirname, 'patches', patchItem.input)
                try {
                    const fileText = readFileSync(inputUrl, 'utf-8')
                    const target = resolve(__dirname, '../../node_modules', patchItem.output)

                    writeFileSync(target, fileText)

                    console.log(ansiColors.green(`Successfully patched file ${ansiColors.yellow(inputUrl)} in ${ansiColors.yellow(target)}`));
                } catch (err) {
                    throw new Error(`dep-patch: Couldn't patch file '${inputUrl}'`, err);
                }
            }
        }
    }
}
patch()
