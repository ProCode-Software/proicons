import fs from 'fs';
import path from 'path';
import { resolveConfig, format } from 'prettier';
import config from '../src/configs/tags.json' with { type: 'json' };
import rename from './rename.js';
import pixelfix from './pixelfix.js';
import chalk from 'ansi-colors';
import sharp from 'sharp';
import { optimize } from 'svgo';
import progress from 'progress';
import { buildFont } from "./build-font.js";
import { patch } from "../tools/dep-patch/index.js";

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
const inDir = path.join('in');
const outDir = path.join('icons/svg');
let variableIcons = [];

const files = fs.readdirSync(inDir);
const newIcons = files.slice();

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

console.log(chalk.green('Done renaming files!'));

// Build SVG list and lockfile
const dict = {};
const existingLockFile =
    fs.existsSync(path.join('icons/icons.lock.json')) && fs.readFileSync(path.join('icons/icons.lock.json'));

/**
 * @type {Array} lockfile
 */
const lockfile = existingLockFile ? JSON.parse(existingLockFile, 'utf8') : [];
Object.keys(config).forEach((friendlyName) => {
    const name = rename.camelCase(friendlyName.trimEnd());
    const fn = rename.kebabCase(friendlyName.trimEnd());

    try {
        dict[name] = fs.readFileSync(path.join(outDir, `${fn}.svg`), 'utf8');

        if (!lockfile.some((z) => z.name == friendlyName)) {
            const lfItem = {
                name: friendlyName,
                added: JSON.parse(fs.readFileSync('package.json', 'utf-8')).version,
            };
            lockfile.push(lfItem);
        } else if (newIcons.includes(`${friendlyName}.svg`)) {
            lockfile.find((z) => z.name == friendlyName).updated = JSON.parse(
                fs.readFileSync('package.json', 'utf-8'),
            ).version;
        }
    } catch (error) {
        throw new Error(`Error reading file ${fn}.svg:`, error);
    }
});

async function buildSvgList() {
    try {
        for (const doc of [dict, lockfile]) {
            const options = await resolveConfig('.prettierrc');
            options.parser = 'json';
            const formatted = await format(JSON.stringify(doc), options);
            const location = doc == dict ? 'src/configs/icons.json' : 'icons/icons.lock.json';

            fs.writeFileSync(path.join(location), formatted);
            console.log(chalk.green(`Done building ${doc == dict ? 'SVG list' : 'lockfile'}!`));
        }
    } catch (error) {
        console.error('Error writing icons.json:', error);
    }
}

// Build PNGs
async function buildPngs() {
    const pngSizes = [24, 72, 120];
    const svgFiles = fs.readdirSync(outDir).filter((file) => file.endsWith('.svg'));

    const progresBar = new progress('  Build PNGs [:bar] :item :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 25,
        total: svgFiles.length * 3 * 2,
    });

    const newSvgsOnly = svgFiles.filter((file) => newIcons.includes(file))
    const promises = []
    for (const file of newSvgsOnly) {
        promises.push((async () => {
            for (const size of pngSizes) {
                const colors = ['black', 'white'];
                const scale = size / 24;
                const newFolder = path.join(`icons/png${scale == 1 ? '' : `@${scale}x`}`);

                for (const color of colors) {
                    const newColorFolder = path.join(newFolder, color);

                    if (!fs.existsSync(newColorFolder)) fs.mkdirSync(newColorFolder, { recursive: true });

                    const fileStr = fs.readFileSync(path.join(outDir, file), 'utf-8').replaceAll('currentColor', color);

                    const newFilePath = path.join(newFolder, color, `${file.slice(0, -4)}.png`);

                    progresBar.tick(1, {
                        item: newFilePath,
                    });

                    try {
                        await sharp(Buffer.from(fileStr)).resize(size, size).png().toFile(newFilePath);
                        await pixelfix(newFilePath);
                    } catch (error) {
                        console.error(`Failed to generate ${file}`, error);
                    }
                }
            }
        })());
    }
    Promise.all(promises).then(() => {
        progresBar.terminate();
        console.log(chalk.green('Done building PNGs!'));
    })
}
(async () => {
    await buildSvgList();
    await buildPngs();
    await buildFont();
})().then(() => {
    console.log(chalk.green('Build complete!'));

    if (newIcons > 0) {
        console.log(chalk.cyan('New icons:', newIcons));

        if (variableIcons.length > 0) {
            console.log(chalk.cyan('\tVariable:', variableIcons));
        }
    } else {
        console.log(chalk.green('No newly added icons!'));
    }
    process.exit(0);
}).catch(error => {
    throw new Error(error)
});