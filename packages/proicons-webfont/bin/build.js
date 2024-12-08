import { readdirSync, copyFileSync, existsSync, rmSync } from "fs"
import { resolve, join } from 'path'
const __dirname = import.meta.dirname
const fontsFolder = resolve(__dirname, '../../../icons/fonts')

const exclude = ['ProIcons.json', 'ProIcons.html']

readdirSync(fontsFolder).forEach(fn => {
    const outFolder = resolve(__dirname, '../')

    // Clean folder
    if (existsSync(resolve(outFolder, fn))) {
        rmSync(resolve(outFolder, fn))
    }

    if (!exclude.includes(fn)) {
        const fp = join(fontsFolder, fn)
        copyFileSync(fp, resolve(outFolder, fn))
    }
})