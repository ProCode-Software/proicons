import * as rename from '@proicons/shared'
import convertPathToRect from '@proicons/svgo-plugins/convertPathToRect'
import ansiColors from 'ansi-colors'
import { $ } from 'bun'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { join, resolve } from 'path'
import { parseArgs } from 'util'
import { Piscina } from 'piscina'
import Progress from 'progress'
import { optimize, type Config as SVGOConfig } from 'svgo'
import inIcons from '../in/in.json' with { type: 'json' }
import pkg from '../package.json' with { type: 'json' }
import { buildFont } from './build/buildFont.ts'
import { prettierFormat } from './helpers/prettierFormat.ts'

const __rootdir = resolve(import.meta.dirname, '../')
const { version } = pkg

type IconsJSON = typeof import('../icons/icons.json')
type Lockfile = typeof import('../icons/icons.lock.json')
interface LockfileItem {
    added: string
    updated?: string
}
interface Icon {
    description: string
    category: string
    icon: string
}
interface IconList {
    [k: string]: Icon
}

const {
    values: {
        rebuild: shouldRebuildAll,
        'font-only': fontOnly,
        'no-update-lockfile': frozenLockfile,
        'optimize-only': optimizeOnly,
    },
} = parseArgs({
    options: {
        rebuild: { type: 'boolean', short: 'r' },
        'font-only': { type: 'boolean', short: 'f' },
        'no-update-lockfile': { type: 'boolean', short: 'l' },
        'optimize-only': { type: 'boolean', short: 'o' },
    },
    strict: true,
    allowPositionals: false,
})

const strokeColors = ['#212325', 'black', '#000000', '#000']

const svgoConfig = {
    multipass: true,
    plugins: [
        {
            name: 'preset-default',
            params: {
                overrides: {
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

let newIcons: string[] = []
if (!existsSync(inDir)) mkdirSync(inDir)

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
            console.error('Error making files:', e)
            throw e
        }

        iconsJson[name as keyof typeof iconsJson] = data
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

async function createLockfile() {
    const config: IconsJSON = await Bun.file(iconsJsonPath).json()
    Object.keys(config).forEach(friendlyName => {
        const lockfileItem: LockfileItem =
            lockfile.icons[friendlyName as keyof typeof lockfile.icons]

        if (!lockfileItem) {
            lockfile.icons[friendlyName] = { added: version }
        } else if (
            !frozenLockfile &&
            newIcons.includes(friendlyName) &&
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
    const filesToProcess = shouldRebuildAll ? svgFiles : newSvgsOnly
    const progressBar = new Progress('  Build PNGs [:bar] :item :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 25,
        total: filesToProcess.length,
    })

    const worker = new Piscina({
        filename: join(import.meta.dir, './build/fixImage.ts'),
    })

    console.time('Build PNGs')
    await Promise.all(
        filesToProcess.map(async file => {
            await worker.run({ file, root: __rootdir })
            progressBar.tick(1, { item: file.slice(0, -4) })
        })
    )
    console.timeEnd('Build PNGs')
    progressBar.terminate()
    console.log(ansiColors.green('Done building PNGs!'))
}

async function buildModules() {
    try {
        const result = await $`pnpm run all:build-modules`.text()
        console.log(result)
    } catch (e) {
        console.error("Couldn't build modules:", e)
        throw e
    }
}

async function run() {
    // TODO: check that package.json version has been bumped from latest published
    console.time('Build time')
    if (optimizeOnly) {
        await optimizeIcons()
        return
    }
    if (fontOnly) {
        await buildFont(newIcons.length > 0 || shouldRebuildAll == true)
        return
    }
    await createSvgFiles()
    await createLockfile()
    await writeLockfile()
    await buildPngs()
    await buildModules()
    await buildFont(newIcons.length > 0 || shouldRebuildAll == true)

    // Build complete
    console.log(ansiColors.greenBright('\nBuild complete!'))
    console.timeEnd('Build time')

    if (newIcons.length > 0) {
        console.log(ansiColors.cyan('New icons: ' + newIcons.join(', ')))
    } else {
        console.log(ansiColors.cyan('No newly added icons'))
    }
}

await run()