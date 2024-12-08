import ansiColors from 'ansi-colors';
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import icons from '../icons/icons.json' with { type: 'json' };
import lockfile from '../icons/icons.lock.json' with { type: 'json' };
import { createSvgNodes } from './build/createSvgNodes.js';
import { getCliParams } from './helpers/getCliParam.js';
import { prettierFormat } from './helpers/prettierFormat.js';
import { camelCase, kebabToPascalCase, pascalCase, pascalToCamelCase } from './helpers/rename.js';

const __dirname = fileURLToPath(dirname(import.meta.url))
const __rootdir = resolve(__dirname, '../')
const outDirParam = getCliParams(process, 'out');
const templateDirParam = getCliParams(process, 't', 'template');
const formatParam = getCliParams(process, 'format', 'f');
const indexDirParam = getCliParams(process, 'index-dir', 'i');
const libParam = getCliParams(process, 'lib') ?? 'vanilla';

const shouldCleanDir = process.argv.slice(2).includes('--clean');
const shouldCreateDataFiles = process.argv.slice(2).includes('-d');

const templateDir = resolve(process.cwd(), templateDirParam);
const outDir = resolve(process.cwd(), outDirParam);

const inDir = resolve(__rootdir, 'icons/svg');
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
        const indexOutDir = resolve(process.cwd(), indexDirParam)

        const indexTemplate = modules
            .map(({ name, path }) => {
                // For backwards compatibility (removes Icon from the end)
                const camelModuleName = pascalToCamelCase(name.slice(0, -4))

                // Aliases: Alias -> Icon in friendly form
                const friendlyName = Object.keys(icons).filter(
                    n => camelCase(n) == camelModuleName
                )

                const aliases = () => {
                    try {
                        const d = Object.entries(lockfile.aliases)
                            .filter(([k, v]) => v == friendlyName)
                            .map(([k, v]) => k)

                        if (d.length == 0) throw new Error()
                        return d
                    } catch (e) {
                        return undefined
                    }
                }

                const aliasExports = aliases()
                    ? aliases()
                        .map(alias => {
                            const a = [pascalCase(alias) + 'Icon']
                            if (libParam == 'vanilla') {
                                a.push(camelCase(alias))
                            }
                            return a
                        })
                        .flat()
                    : undefined

                const exportNames = [
                    ...(libParam == 'vanilla' ? [camelModuleName] : [name.slice(0, -4)]), // Camel name or Camel name without icon
                    ...(aliasExports ?? []), // Aliases
                ].map(e => `${name} as ${e}`)

                exportNames.unshift(name)

                // Name with Icon at end and camel name
                return `export { ${exportNames.join(', ')} } from '${path}'`
            })
            .join('\n')

        writeFileSync(indexOutDir, indexTemplate)
        console.log(
            ansiColors.green(`Successfully created icons index at ${indexOutDir}!`)
        )
    }
    if (shouldCreateDataFiles) {
        const formatAndWrite = async (data, file) => {
            const formatted = await prettierFormat('export default ' + JSON.stringify(data), 'babel');

            writeFileSync(resolve(process.cwd(), 'src', file), formatted);
        };

        const iconListData = Object.keys(icons).map((name) => name).sort();

        const categoryData = Object.values(icons)
            .map(({ category }) => category)
            .filter((item, index, array) => array.indexOf(item) === index).sort();

        await formatAndWrite(iconListData, `iconList.${formatParam}`);
        console.log(ansiColors.green(`Successfully created icon list!`));

        await formatAndWrite(categoryData, `categories.${formatParam}`);
        console.log(ansiColors.green(`Successfully created category list!`));
    }
})();
