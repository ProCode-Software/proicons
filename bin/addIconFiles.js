import ansiColors from "ansi-colors";
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { createSvgNodes } from './build/createSvgNodes.js';
import { getCliParams } from "./build/getCliParam.js";
import { prettierFormat } from "./build/prettierFormat.js";
import { kebabToPascalCase } from './rename.js';

const outDirParam = getCliParams(process, 'out')
const templateDirParam = getCliParams(process, 't', 'template')
const formatParam = getCliParams(process, 'format', 'f')

const shouldCleanDir = process.argv.slice(2).includes('--clean')

const templateDir = resolve(process.cwd(), templateDirParam)
const outDir = resolve(process.cwd(), outDirParam)

const inDir = resolve('icons/svg');
// const outDir = resolve('src/icons');

if (shouldCleanDir) {
    rmSync(outDir, { recursive: true, force: true })
    mkdirSync(outDir, { recursive: true })
}

const files = readdirSync(inDir);

(async () => {
    for (const inFile of files) {
        const filename = inFile.slice(0, -4);
        const moduleName = kebabToPascalCase(filename);

        const svgContent = readFileSync(resolve(inDir, inFile), 'utf-8');
        const svgNodes = createSvgNodes(svgContent)

        /** @type {import('./build/iconTemplate.js').default} */
        const renderTemplate = (await import(templateDir)).default

        const result = renderTemplate(moduleName, svgNodes)

        const formatted = await prettierFormat(result, 'babel')

        writeFileSync(
            resolve(outDir, `${moduleName}.${formatParam}`),
            formatted,
        )
    }

    console.log(ansiColors.green(`Successfully created .${formatParam} files for ${files.length} files in ${outDir}!`));
})()
