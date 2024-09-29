const { readdirSync, copyFileSync, existsSync, rmSync } = require("fs")
const path = require('path')
const fontsFolder = path.resolve(__dirname, '../../../icons/fonts')

const exclude = ['ProIcons.json', 'ProIcons.html']

readdirSync(fontsFolder).forEach(fn => {
    const outFolder = path.resolve(__dirname, '../')

    // Clean folder
    if (existsSync(path.resolve(outFolder, fn))) {
        rmSync(path.resolve(outFolder, fn))
    }

    if (!exclude.includes(fn)) {
        const fp = path.join(fontsFolder, fn)
        copyFileSync(fp, path.resolve(outFolder, fn))
    }
})