import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs'
import { resolve } from 'path';
import { prettierFormat } from './build/prettierFormat.js'
import * as rename from './rename.js';
import ansiColors from 'ansi-colors';
import { optimize } from 'svgo';
import progress from 'progress';
import { buildFont } from "./build/build-font.js";
import { Piscina } from 'piscina'
import { execSync } from "child_process";

const __rootdir = process.cwd()

const argChoice = (c1, c2) => {
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
const version = JSON.parse(readFileSync('package.json', 'utf-8')).version

const strokeColors = ['#212325', 'black', '#000000', '#000'];
/** @type {import("svgo").Config} */
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
    ],
};

// Move and rename SVGs
const inDir = resolve('in');
const outDir = resolve('icons/svg');
const iconsJsonPath = resolve('icons/icons.json')

let variableIcons = [];
let newIcons = []

if (!existsSync(inDir)) mkdirSync(inDir)
const files = readdirSync(inDir);

function getIconsJson() {
    /** @type {import('../icons/icons.json')} */
    const iconsJson = JSON.parse(
        readFileSync(iconsJsonPath, 'utf-8')
    )
    return iconsJson
}

// Only optimize icons
async function optimizeIcons() {
    const iconsJson = getIconsJson()

    try {
        await writeSvgFilesFromData(iconsJson)

        console.log(ansiColors.bold(ansiColors.green('Optimized icons!')));
    } catch (e) { throw e }
}

// Transform JSON data into files
async function writeSvgFilesFromData(jsonData) {
    const iconsJson = getIconsJson()
    

    for (const [name, data] of Object.entries(jsonData)) {
        newIcons.push(name)

        let iconData = data.icon
        strokeColors.forEach((color) => {
            iconData = iconData.replaceAll(color, 'currentColor');
        });

        let optimized = optimize(iconData, svgoConfig).data;

        try {
            const fn = rename.kebabCase(name.trim())

            writeFileSync(
                resolve(outDir, `${fn}.svg`),
                optimized
            )
            data.icon = optimized
        } catch (e) {
            console.log(ansiColors.red('Error making files:'));
            throw e
        }

        if (name.endsWith(' Variable')) {
            variableIcons.push(name)
        }

        iconsJson[name] = data
    }
    const formatted = await prettierFormat(iconsJson)
    writeFileSync(iconsJsonPath, formatted)
}

async function createSvgFiles() {
    /** @type {import('../in/in.json')} */
    let inIcons

    try {
        inIcons = JSON.parse(
            readFileSync(
                resolve(inDir, files.find((f) => f.toLowerCase().endsWith('.json'))),
                'utf-8'
            )
        )
    } catch (e) {
        return
    }
    await writeSvgFilesFromData(inIcons)

    console.log(ansiColors.green('Done creating SVG files!'));

}

// Build lockfile
/**
 * @type {import('../icons/icons.lock.json')} lockfile
 */
const lockfile = existsSync(resolve('icons/icons.lock.json'))
    ? JSON.parse(readFileSync(resolve('icons/icons.lock.json'), 'utf-8'))
    : [];

function createLockfile() {
    /** @type {import('../icons/icons.json')} */
    const config = JSON.parse(readFileSync(iconsJsonPath, 'utf-8'))

    Object.keys(config).forEach(friendlyName => {
        const iconInLockfile = z => z.name == friendlyName

        if (!lockfile.icons.some(iconInLockfile)) {
            const lfItem = {
                name: friendlyName,
                added: version,
            }
            lockfile.icons.push(lfItem)
        } else if (
            newIcons.includes(friendlyName) &&
            lockfile.icons.some(iconInLockfile) &&
            lockfile.icons.find(iconInLockfile).added != version
        ) {
            lockfile.icons.find(iconInLockfile).updated = version
        }
    })
}

async function writeLockfile() {
    try {
        const formatted = await prettierFormat(lockfile)
        const location = resolve('icons/icons.lock.json');

        writeFileSync(location, formatted);

        console.log(ansiColors.green(`Done building lockfile!`));

    } catch (error) {
        console.error('Error writing lockfile:');
        throw error
    }
}

// Convert to PNGs
async function buildPngs() {

    const svgFiles = readdirSync(outDir).filter((file) => file.endsWith('.svg'));

    const progressBar = new progress('  Build PNGs [:bar] :item :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 25,
        total: svgFiles.length * 3 * 2,
    });

    const worker = new Piscina({
        filename: new URL('./build/fix-image.js', import.meta.url).href
    })

    const newSvgsOnly = newIcons.map(i => rename.kebabCase(i.trim()) + '.svg')

    console.time('Build PNGs')

    const promises = []
    for (const file of (args.shouldRebuildAll ? svgFiles : newSvgsOnly)) {
        promises.push((async () => {

            await worker.run({ file, root: __rootdir })

            progressBar.tick(1, {
                item: file.slice(0, -4),
            });
        })());
    }
    await Promise.all(promises)

    console.timeEnd('Build PNGs')
    progressBar.terminate();
    console.log(ansiColors.green('Done building PNGs!'));
}

function buildModules() {
    try {
        const result = execSync(`pnpm run icons:build-modules`)
        console.log(result.toString('utf-8'));
    } catch(e) {
        console.log(ansiColors.red('Couldn\'t build modules:'));
        throw e
    }
}

(async () => {
    console.time('Build time')
    if (args.optimizeOnly) {
        await optimizeIcons()
        return
    }
    if (!args.fontOnly) {
        await createSvgFiles()
        createLockfile()
        await writeLockfile();
        await buildPngs();
        buildModules()
    }
    await buildFont(newIcons.length > 0 || args.shouldRebuildAll);
})().then(() => {
    console.timeEnd('Build time')
    console.log(ansiColors.green(ansiColors.bold('\nBuild complete!')));

    if (newIcons > 0) {
        console.log(ansiColors.dim('New icons:', newIcons));

        if (variableIcons.length > 0) {
            console.log(ansiColors.dim('\tVariable icons:', ansiColors.yellow(variableIcons)));
        }
    } else {
        console.log(ansiColors.dim('No newly added icons'));
    }
    process.exit(0);
}).catch(error => {
    throw error
});