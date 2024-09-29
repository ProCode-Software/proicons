const { readdirSync, copyFileSync } = require("fs")
const path = require('path')
const fontsFolder = path.resolve(__dirname, '../../../icons/fonts')

readdirSync(fontsFolder).forEach(fn => {
    const fp = path.join(fontsFolder, fn)
    copyFileSync(fp, path.resolve(__dirname, '../', fn))
})