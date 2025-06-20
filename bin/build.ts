import ansiColors from 'ansi-colors'
import { execSync } from 'child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { Piscina } from 'piscina'
import progress from 'progress'
import { optimize } from 'svgo'
import inIcons from '../in/in.json' with { type: 'json' }
import pkg from '../package.json' with { type: 'json' }
import { buildFont } from './build/build-font.ts'
import { prettierFormat } from './helpers/prettierFormat.ts'
import convertPathToRect from '@proicons/svgo-plugins/convertPathToRect'
import * as rename from './helpers/rename.ts'
import { type Config as SVGOConfig } from 'svgo'

const __rootdir = resolve(import.meta.dirname, '../')
const { version } = pkg

type IconsJSON = typeof import('../icons/icons.json')
type Lockfile = typeof import('../icons/icons.lock.json')
interface Icon {
    description: string
    category: string
    icon: string
}
interface IconList {
    [k: string]: Icon
}

const argChoice = (c1: string, c2: string) => {
    const argv = process.argv.slice(2)
    return argv.includes(c1) || argv.includes(c2)
}

const args = {
    // Should rebuild all images
    shouldRebuildAll: argChoice('--rebuild', '-r'),
    // Only build font
    fontOnly: argChoice('--font-only', '-f'),
    // Don't update the lockfile
    frozenLockfile: argChoice('--no-update-lockfile', '-l'),
    // Only optimize icons
    optimizeOnly: argChoice('--optimize-only', '-o'),
}

const strokeColors = ['#212325', 'black', '#000000', '#000']

const svgoConfig = {
    multipass: true,
    plugins: [
        {
            name: 'preset-default',
            params: {
                overrides: {
                    removeViewBox: false,
                    inlineStyles: {
                        onlyMatchedOnce: false,
                    },
                    convertShapeToPath: false,
                },
            },
        },
        convertPathToRect,
    ],
} satisfies SVGOConfig

// Move and rename SVGs
const inDir = resolve(__rootdir, 'in')
const outDir = resolve(__rootdir, 'icons/svg')
const iconsJsonPath = resolve(__rootdir, 'icons/icons.json')

let newIcons = []
if (!existsSync(inDir)) mkdirSync(inDir)
const files = readdirSync(inDir)

function getIconsJson(): IconsJSON {
    const iconsJson: IconsJSON = JSON.parse(readFileSync(iconsJsonPath, 'utf-8'))
    return iconsJson
}

// Only optimize icons
async function optimizeIcons() {
    const iconsJson = getIconsJson()

    try {
        await writeSvgFilesFromData(iconsJson)

        console.log(ansiColors.bold(ansiColors.green('Optimized icons!')))
    } catch (e) {
        throw e
    }
}

// Transform JSON data into files
async function writeSvgFilesFromData(jsonData: IconList) {
    const iconsJson = getIconsJson()

    for (const [name, data] of Object.entries(jsonData)) {
        newIcons.push(name)

        let iconData = data.icon
        strokeColors.forEach(color => {
            iconData = iconData.replaceAll(color, 'currentColor')
        })
        if (data.category == 'NO CATEGORY' || !data.category) {
            throw new Error(`Icon ${name} does not have a category`)
        }

        let optimized = optimize(iconData, svgoConfig).data

        try {
            const fn = rename.kebabCase(name.trim())

            writeFileSync(resolve(outDir, `${fn}.svg`), optimized)
            data.icon = optimized
        } catch (e) {
            console.log(ansiColors.red('Error making files:'))
            throw e
        }

        iconsJson[name] = data
    }
    const formatted = await prettierFormat(iconsJson)
    writeFileSync(iconsJsonPath, formatted)
}

async function createSvgFiles() {
    await writeSvgFilesFromData(inIcons)
    console.log(ansiColors.green('Done creating SVG files!'))
}

// Build lockfile
const lockfile: Lockfile = existsSync(resolve(__rootdir, 'icons/icons.lock.json'))
    ? JSON.parse(readFileSync(resolve(__rootdir, 'icons/icons.lock.json'), 'utf-8'))
    : []

function createLockfile() {
    const config: IconsJSON = JSON.parse(readFileSync(iconsJsonPath, 'utf-8'))

    Object.keys(config).forEach(friendlyName => {
        const iconInLockfile = z => z.name == friendlyName
        const lockfileItem = lockfile.icons.find(iconInLockfile)

        if (!lockfileItem) {
            const lfItem = {
                name: friendlyName,
                added: version,
            }
            lockfile.icons.push(lfItem)
        } else if (
            newIcons.includes(friendlyName) &&
            lockfileItem &&
            lockfileItem.added != version
        ) {
            lockfileItem.updated = version
        }
    })
}

async function writeLockfile() {
    try {
        const formatted = await prettierFormat(lockfile)
        const location = resolve(__rootdir, 'icons/icons.lock.json')

        writeFileSync(location, formatted)

        console.log(ansiColors.green(`Done building lockfile!`))
    } catch (error) {
        console.error('Error writing lockfile:')
        throw error
    }
}

// Convert to PNGs
async function buildPngs() {
    const svgFiles = readdirSync(outDir).filter(file => file.endsWith('.svg'))
    const newSvgsOnly = newIcons.map(i => rename.kebabCase(i.trim()) + '.svg')

    const progressBar = new progress('  Build PNGs [:bar] :item :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 25,
        total: svgFiles.length * 3 * 2,
    })

    const worker = new Piscina({
        filename: new URL('./build/fix-image.ts', import.meta.url).href,
    })

    console.time('Build PNGs')

    const promises = []
    for (const file of args.shouldRebuildAll ? svgFiles : newSvgsOnly) {
        promises.push(
            (async () => {
                await worker.run({ file, root: __rootdir })

                progressBar.tick(1, {
                    item: file.slice(0, -4),
                })
            })()
        )
    }
    await Promise.all(promises)

    console.log('')
    console.timeEnd('Build PNGs')
    progressBar.terminate()
    console.log(ansiColors.green('Done building PNGs!'))
}

function buildModules() {
    try {
        const result = execSync(`pnpm run icons:build-modules`)
        console.log(result.toString('utf-8'))
    } catch (e) {
        console.log(ansiColors.red("Couldn't build modules:"))
        throw e
    }
}

;(async () => {
    console.time('Build time')
    if (args.optimizeOnly) {
        await optimizeIcons()
        return
    }
    if (!args.fontOnly) {
        await createSvgFiles()
        createLockfile()
        await writeLockfile()
        await buildPngs()
        buildModules()
    }
    await buildFont(newIcons.length > 0 || args.shouldRebuildAll)
})().then(() => {
    console.log(ansiColors.greenBright('\nBuild complete!'))
    console.timeEnd('Build time')

    if (newIcons.length > 0) {
        console.log(ansiColors.cyan('New icons: ' + newIcons.join(', ')))
    } else {
        console.log(ansiColors.cyan('No newly added icons'))
    }
    process.exit(0)
})
