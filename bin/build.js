import fs from 'fs';
import path from 'path';
import { resolveConfig, format } from 'prettier';
import config from '../src/configs/tags.json' with { type: 'json' };
import rename from './rename.js';
import ansiColors from 'ansi-colors';
import { optimize } from 'svgo';
import progress from 'progress';
import { buildFont } from "./build-font.js";
import { patch } from "../tools/dep-patch/index.js";
import { Piscina } from 'piscina'

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
    // Use legacy build
    legacy: argChoice('--legacy', '-L'),
    // Only optimize icons
    optimizeOnly: argChoice('--optimize-only', '-o'),
}

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
const inDir = path.resolve('in');
const outDir = path.resolve('icons/svg');
let variableIcons = [];

if (!fs.existsSync(inDir)) fs.mkdirSync(inDir)

const files = fs.readdirSync(inDir);
const newIcons = files.slice();

// Only optimize icons
function optimizeIcons() {
    for (const iconPath of fs.readdirSync(outDir)) {
        const p = path.resolve(outDir, iconPath)
        const iconData = fs.readFileSync(p, 'utf-8')

        fs.writeFileSync(p, optimize(iconData, svgoConfig).data)
    }

    console.log(ansiColors.green('Optimized icons!'));
}

function makeFilesLegacy() {
    files
        .filter((file) => file.endsWith('.svg'))
        .forEach((file) => {
            const oldPath = path.join(inDir, file);
            if (file.includes(' -Var')) {
                variableIcons.push(file.slice(0, -4));
            }
            const newName = rename.kebabCase(file);
            const newPath = path.join(outDir, newName);

            try {
                let ct = optimize(fs.readFileSync(oldPath, 'utf8'), svgoConfig).data;
                strokeColors.forEach((color) => {
                    ct = ct.replaceAll(color, 'currentColor');
                });
                fs.writeFileSync(newPath, ct);
                fs.unlinkSync(oldPath);
            } catch (error) {
                console.error(`Error moving file ${file}:`, error);
            }
        });

    console.log(ansiColors.green('Done renaming files!'));
}
function makeFiles() {
    /** @type {import('../in/in.json')} */
    let inIcons
    try {
        inIcons = JSON.parse(
            fs.readFileSync(
                path.resolve(inDir, files.find((f) => f.toLowerCase().endsWith('.json'))),
                'utf-8'
            )
        )
    } catch (e) {
        console.log(ansiColors.red('No JSON file found, using legacy method'));
        makeFilesLegacy()
    }
    for (const [name, data] of Object.entries(inIcons)) {
        let optimized = optimize(fs.readFileSync(data.icon, 'utf8'), svgoConfig).data;

        strokeColors.forEach((color) => {
            optimized = optimized.replaceAll(color, 'currentColor');
        });

        fs.writeFileSync(
            path.resolve(outDir, `${rename.kebabCase(name)}.svg`),
            optimized
        )

        if (name.endsWith(' Variable')) {
            variableIcons.push(name)
        }
    }
}

// Build SVG list and lockfile
const dict = {};
const existingLockFile =
    fs.existsSync(path.join('icons/icons.lock.json')) && fs.readFileSync(path.join('icons/icons.lock.json'));

/**
 * @type {import('../icons/icons.lock.json')} lockfile
 */
const lockfile = existingLockFile ? JSON.parse(existingLockFile, 'utf8') : [];

function createDocs() {
    Object.keys(config).forEach((friendlyName) => {
        const name = rename.camelCase(friendlyName.trimEnd());
        const fn = rename.kebabCase(friendlyName.trimEnd());

        try {
            dict[name] = fs.readFileSync(path.join(outDir, `${fn}.svg`), 'utf8');

            if (!lockfile.icons.some((z) => z.name == friendlyName)) {
                const lfItem = {
                    name: friendlyName,
                    added: JSON.parse(fs.readFileSync('package.json', 'utf-8')).version,
                };
                lockfile.icons.push(lfItem);
            } else if (newIcons.includes(`${friendlyName}.svg`)) {
                lockfile.icons.find((z) => z.name == friendlyName).updated = JSON.parse(
                    fs.readFileSync('package.json', 'utf-8'),
                ).version;
            }
        } catch (error) {
            throw new Error(`Error reading file ${fn}.svg:`, error);
        }
    });
}

async function buildSvgList() {
    try {
        const docsToUpdate = args.frozenLockfile ? [dict] : [dict, lockfile]
        for (const doc of docsToUpdate) {
            const options = await resolveConfig('.prettierrc');
            options.parser = 'json';
            const formatted = await format(JSON.stringify(doc), options);
            const location = doc == dict ? 'src/configs/icons.json' : 'icons/icons.lock.json';

            fs.writeFileSync(path.join(location), formatted);
            console.log(ansiColors.green(`Done building ${doc == dict ? 'SVG list' : 'lockfile'}!`));
        }
    } catch (error) {
        console.error('Error writing icons.json:', error);
    }
}

// Build PNGs
async function buildPngs() {

    const svgFiles = fs.readdirSync(outDir).filter((file) => file.endsWith('.svg'));

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
        optimizeIcons()
        return
    }
    if (!args.fontOnly) {
        if (args.legacy) {
            makeFilesLegacy()
        } else {
            makeFiles()
        }
        createDocs()
        await buildSvgList();
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
    throw new Error(error)
});