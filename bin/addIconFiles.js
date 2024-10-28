import { readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { kebabToPascalCase } from './rename.js';
import { createSvgNodes } from './build/createSvgNodes.js';

const [outDir, templateDir] = process.argv.slice(2);

const inDir = resolve('icons/svg');
// const outDir = resolve('src/icons');

for (const inFile of readdirSync(inDir)) {
    const filename = inFile.slice(0, -4);
    const moduleName = kebabToPascalCase(filename);

    const fileContent = readFileSync(resolve(inDir, inFile), 'utf-8');
    const svgNodes = createSvgNodes(fileContent)

    import('./build/iconTemplate.js').then(({ template }) => {
        template(
            moduleName,
            fileContent,
            svgNodes
        );
    })

}
