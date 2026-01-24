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

let { version } = pkg
const ROOT_DIR = join(import.meta.dir, '../')
const resolveRoot = (...paths: string[]) => join(ROOT_DIR, ...paths)

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
const inDir = resolveRoot('in')
const outDir = resolveRoot('icons/svg')
const iconsJsonPath = resolveRoot('icons/icons.json')

let newIcons: string[] = []
if (!existsSync(inDir)) mkdirSync(inDir)

function getIconsJson(): IconsJSON {
    const iconsJson: IconsJSON = JSON.parse(readFileSync(iconsJsonPath, 'utf-8'))
    return iconsJson
}

/** Checks the `version` in `package.json` against the latest version on npm. If it is the same or lower, prompts the user to enter a new version. */
async function versionCheck() {
    const res = await Bun.fetch('https://registry.npmjs.org/proicons')
    const {
        'dist-tags': { latest },
    } = (await res.json()) as { 'dist-tags': { latest: string } }

    // This does string comparison, meaning 4.11.1 < 4.1.0, but it is ok here
    if (version > latest) return
    let newVersion: string
    // Keep prompting until a valid version is entered
    while (
        !(newVersion = prompt(`Enter a new version (latest is ${latest})`)!) ||
        newVersion <= latest
    );
    version = newVersion
    pkg.version = newVersion
    Bun.write(resolveRoot('package.json'), JSON.stringify(pkg, undefined, 4))
}

/** Writes data from `jsonData` into `icons/icons.json`, and writes optimized SVG files into `icons/svg`. */
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

/** Optimizes **all icons** and writes them into `icons/svg`. */
async function optimizeIcons() {
    await writeSvgFilesFromData(getIconsJson())

    console.log(ansiColors.bold(ansiColors.green('Optimized icons!')))
}

/** Writes data for **new icons** into `icons/icons.json`, and optimized SVG files into `icons/svg`. */
async function createSvgFiles() {
    await writeSvgFilesFromData(inIcons)
    console.log(ansiColors.green('Done creating SVG files!'))
}

// Build lockfile
const lockfile: Lockfile = existsSync(resolveRoot('icons/icons.lock.json'))
    ? JSON.parse(readFileSync(resolveRoot('icons/icons.lock.json'), 'utf-8'))
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
        const location = resolveRoot('icons/icons.lock.json')

        writeFileSync(location, formatted)

        console.log(ansiColors.green(`Done building lockfile!`))
    } catch (error) {
        console.error('Error writing lockfile:')
        throw error
    }
}

/** Converts queued icon SVG files from `icons/svg` into PNG files in `icons/png*`. Files are processed in parallel. */
async function buildPNGs() {
    const filesToProcess = shouldRebuildAll
        ? readdirSync(outDir).filter(file => file.endsWith('.svg'))
        : newIcons.map(i => rename.kebabCase(i.trim()) + '.svg')
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
            await worker.run({ file, root: ROOT_DIR })
            progressBar.tick(1, { item: file.slice(0, -4) })
        })
    )
    console.timeEnd('Build PNGs')
    progressBar.terminate()
    console.log(ansiColors.green('Done building PNGs!'))
}

/** Builds icon modules for all packages. */
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
    const rebuildFont = newIcons.length > 0 || shouldRebuildAll == true
    if (fontOnly) {
        await buildFont(rebuildFont)
        return
    }
    await versionCheck()
    await createSvgFiles()
    await createLockfile()
    await writeLockfile()
    await buildPNGs()
    await buildModules()
    await buildFont(rebuildFont)

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