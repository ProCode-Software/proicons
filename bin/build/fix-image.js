import fs from 'fs/promises'
import pixelfix from './pixelfix.js';
import sharp from 'sharp';
import path from 'path'

/**
 * @param {string} file
 * @param {string} root
 */
export default async ({ file, root }) => {
    const pngSizes = [24, 72, 120];
    const outDir = path.resolve(root, 'icons/svg');
    
    for (const size of pngSizes) {
        const colors = ['black', 'white'];
        const scale = size / 24;
        const newFolder = path.resolve(root, `icons/png${scale == 1 ? '' : `@${scale}x`}`);

        for (const color of colors) {
            const newColorFolder = path.join(newFolder, color);

            await fs.mkdir(newColorFolder, { recursive: true });

            const fileCt = await fs.readFile(path.join(outDir, file), 'utf-8')
            const fileStr = fileCt.replaceAll('currentColor', color);

            const newFilePath = path.resolve(newFolder, color, `${file.slice(0, -4)}.png`);

            try {
                await sharp(Buffer.from(fileStr)).resize(size, size).png().toFile(newFilePath);
                await pixelfix(newFilePath);
            } catch (error) {
                console.error(`Failed to generate ${file}`, error);
            }
        }
    }
    return true
}