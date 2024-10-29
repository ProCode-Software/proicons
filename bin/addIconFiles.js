import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { kebabToPascalCase } from './rename.js';
import { createSvgNodes } from './build/createSvgNodes.js';
import { getCliParams } from "./build/getCliParam.js";

const outDirParam = getCliParams(process, 'out')
const templateDirParam = getCliParams(process, 't', 'template')
const formatParam = getCliParams(process, 'format', 'f')

const templateDir = resolve(process.cwd(), templateDirParam)
const outDir = resolve(process.cwd(), outDirParam)

const inDir = resolve('icons/svg');
// const outDir = resolve('src/icons');

(async () => {
    for (const inFile of readdirSync(inDir)) {
        const filename = inFile.slice(0, -4);
        const moduleName = kebabToPascalCase(filename);

        const svgContent = readFileSync(resolve(inDir, inFile), 'utf-8');
        const svgNodes = createSvgNodes(svgContent)

        const renderTemplate = (await import(templateDir)).default

        const result = renderTemplate(moduleName, svgContent, svgNodes)
        

        /* writeFileSync(
            resolve(outDir, `${moduleName}.${formatParam}`),
            result,
        ) */
    }
})()
