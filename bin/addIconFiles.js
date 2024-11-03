import ansiColors from 'ansi-colors';
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { createSvgNodes } from './build/createSvgNodes.js';
import { getCliParams } from './build/getCliParam.js';
import { prettierFormat } from './build/prettierFormat.js';
import { kebabToPascalCase } from './rename.js';
import icons from '../icons/icons.json' with { type: 'json' };

const outDirParam = getCliParams(process, 'out');
const templateDirParam = getCliParams(process, 't', 'template');
const formatParam = getCliParams(process, 'format', 'f');
const indexDirParam = getCliParams(process, 'index-dir', 'i');

const shouldCleanDir = process.argv.slice(2).includes('--clean');
const shouldCreateDataFiles = process.argv.slice(2).includes('-d');

const templateDir = resolve(process.cwd(), templateDirParam);
const outDir = resolve(process.cwd(), outDirParam);

const inDir = resolve('icons/svg');
// const outDir = resolve('src/icons');

if (shouldCleanDir) {
    rmSync(outDir, { recursive: true, force: true });
    mkdirSync(outDir, { recursive: true });
}

const files = readdirSync(inDir);

/** @type {{ name: string, path: string }[]} */
const modules = [];

(async () => {
    for (const inFile of files) {
        const filename = inFile.slice(0, -4);
        const moduleName = kebabToPascalCase(filename) + 'Icon';
        const outputPath = resolve(outDir, `${moduleName}.${formatParam}`);

        modules.push({
            name: moduleName,
            path: `./icons/${moduleName}`,
        });

        const svgContent = readFileSync(resolve(inDir, inFile), 'utf-8');
        const svgNodes = createSvgNodes(svgContent);

        /** @type {import('./build/templates/iconTemplate.js').default} */
        const renderTemplate = (await import(templateDir)).default;

        const result = renderTemplate(moduleName, svgNodes);

        const formatted = await prettierFormat(result, 'babel');

        writeFileSync(outputPath, formatted);
    }

    console.log(ansiColors.green(`Successfully created .${formatParam} files for ${files.length} files in ${outDir}!`));

    if (indexDirParam) {
        const indexOutDir = resolve(process.cwd(), indexDirParam);

        const indexTemplate = modules
            .map(({ name, path }) => `export { default as ${name} } from '${path}'`)
            .join('\n');

        writeFileSync(indexOutDir, indexTemplate);
        console.log(ansiColors.green(`Successfully created icons index at ${indexOutDir}!`));
    }
    if (shouldCreateDataFiles) {
        const formatAndWrite = async (data, file) => {
            const formatted = await prettierFormat('export default ' + JSON.stringify(data), 'babel');

            writeFileSync(resolve(process.cwd(), 'src', file), formatted);
        };

        const iconListData = Object.keys(icons).map((name) => name);

        const categoryData = Object.values(icons)
            .map(({ category }) => category)
            .filter((item, index, array) => array.indexOf(item) === index);

        await formatAndWrite(iconListData, `iconList.${formatParam}`);
        console.log(ansiColors.green(`Successfully created icon list!`));

        await formatAndWrite(categoryData, `categories.${formatParam}`);
        console.log(ansiColors.green(`Successfully created category list!`));
    }
})();
