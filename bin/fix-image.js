import fs from 'fs'
import pixelfix from './pixelfix.js';
import sharp from 'sharp';
import path from 'path'

const pngSizes = [24, 72, 120];
const outDir = path.join('icons/svg');

/** @param {string} file */
export default async ({ file }) => {
    for (const size of pngSizes) {
        const colors = ['black', 'white'];
        const scale = size / 24;
        const newFolder = path.join(`icons/png${scale == 1 ? '' : `@${scale}x`}`);

        for (const color of colors) {
            const newColorFolder = path.join(newFolder, color);

            if (!fs.existsSync(newColorFolder)) fs.mkdirSync(newColorFolder, { recursive: true });

            const fileStr = fs.readFileSync(path.join(outDir, file), 'utf-8').replaceAll('currentColor', color);

            const newFilePath = path.join(newFolder, color, `${file.slice(0, -4)}.png`);

            try {
                await sharp(Buffer.from(fileStr)).resize(size, size).png().toFile(newFilePath);
                await pixelfix(newFilePath);
            } catch (error) {
                console.error(`Failed to generate ${file}`, error);
            }
        }
    }
}