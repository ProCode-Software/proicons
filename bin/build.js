import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs'
import { resolve } from 'path';
import rename from './rename.js';
import ansiColors from 'ansi-colors';
import { optimize } from 'svgo';
import progress from 'progress';
import { buildFont } from "./build-font.js";
import { patch } from "../tools/dep-patch/index.js";
import { Piscina } from 'piscina'
import { prettierFormat, getIconsJson, args } from "./build/utils.js";

const version = JSON.parse(readFileSync('package.json', 'utf-8')).version

// Patch dependencies
patch()

const strokeColors = ['#212325', 'black', '#000000'];
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
                },
            },
        },
    ],
};

// Move and rename SVGs
const inDir = resolve('in');
const outDir = resolve('icons/svg');
export const iconsJsonPath = resolve('icons/icons.json')

let variableIcons = [];
let newIcons = []

if (!existsSync(inDir)) mkdirSync(inDir)
const files = readdirSync(inDir);

// Only optimize icons
async function optimizeIcons() {
    const iconsJson = getIconsJson()

    try {
        writeSvgFilesFromData(iconsJson)

        console.log(ansiColors.bold(ansiColors.green('Optimized icons!')));
    } catch (e) { throw e }
}

async function writeSvgFilesFromData(jsonData) {
    const iconsJson = getIconsJson()

    for (const [name, data] of Object.entries(jsonData)) {
        newIcons.push(name)

        let optimized = optimize(data.icon, svgoConfig).data;

        strokeColors.forEach((color) => {
            optimized = optimized.replaceAll(color, 'currentColor');
        });

        try {
            writeFileSync(
                resolve(outDir, `${rename.kebabCase(name)}.svg`),
                optimized
            )
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

// Transform JSON data into files
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
    const config = JSON.parse(
        readFileSync(iconsJsonPath, 'utf-8')
    )

    Object.keys(config).forEach((friendlyName) => {
        const iconInLockfile = (z) => z.name == friendlyName

        if (!lockfile.icons.some(iconInLockfile)) {
            const lfItem = {
                name: friendlyName,
                added: version,
            };
            lockfile.icons.push(lfItem);

        } else if (newIcons.includes(friendlyName) && lockfile.icons.some(iconInLockfile)) {
            lockfile.icons.find(iconInLockfile).updated = version;
        }
    });
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
        filename: new URL('./fix-image.js', import.meta.url).href
    })

    const newSvgsOnly = svgFiles.filter((file) => newIcons.includes(file))
    console.time('Build PNGs')

    const promises = []
    for (const file of (args.shouldRebuildAll ? svgFiles : newSvgsOnly)) {
        promises.push((async () => {
            await worker.run({ file })
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
    }
    await buildFont(args.shouldRebuildAll);
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