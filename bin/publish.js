const fs = require('fs')
const path = require('path')

const inDir = path.join('src/configs')
const outDir = path.join('dist')

fs.readdirSync(inDir).forEach(file => {
    fs.copyFileSync(path.join(inDir, file), path.join(outDir, file))
})