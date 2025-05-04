import ansiColors from 'ansi-colors'
import {
    existsSync,
    mkdirSync,
    readdirSync,
    readFileSync,
    rmSync,
    writeFileSync,
} from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import icons from '../icons/icons.json' with { type: 'json' }
import lockfile from '../icons/icons.lock.json' with { type: 'json' }
import { createSvgNodes } from './build/createSvgNodes.js'
import { getCliParams } from './helpers/getCliParam.js'
import { prettierFormat } from './helpers/prettierFormat.js'
import { camelCase, kebabCase, pascalCase } from './helpers/rename.js'

const __dirname = fileURLToPath(dirname(import.meta.url))
const __rootdir = resolve(__dirname, '../')
const outDirParam = getCliParams(process, 'out')
const templateDirParam = getCliParams(process, 't', 'template')
const formatParam = getCliParams(process, 'format', 'f')
const indexDirParam = getCliParams(process, 'index-dir', 'i')
const libParam = getCliParams(process, 'lib') ?? 'vanilla'

const shouldCleanDir = process.argv.slice(2).includes('--clean')
const shouldCreateDataFiles = process.argv.slice(2).includes('-d')

const templateDir = resolve(process.cwd(), templateDirParam)
const outDir = resolve(process.cwd(), outDirParam)

const inDir = resolve(__rootdir, 'icons/svg')

if (shouldCleanDir) rmSync(outDir, { recursive: true, force: true })
if (!existsSync(outDir) || shouldCleanDir) mkdirSync(outDir, { recursive: true })

const files = readdirSync(inDir)

/** @type {{ name: string, path: string, friendlyName: string }[]} */
const modules = []

if (files.length !== Object.keys(icons).length)
    throw new Error(
        'The number of files in SVG folder and icons in icons.json are not the same.'
    )

Promise.all(
    Object.keys(icons).map(async iconName => {
        const inFile = kebabCase(iconName) + '.svg'
        const moduleName = pascalCase(iconName) + 'Icon'

        const outputPath = resolve(outDir, `${moduleName}.${formatParam}`)

        modules.push({
            name: moduleName,
            friendlyName: iconName,
            path: `./icons/${moduleName}${formatParam !== 'ts' ? `.${formatParam}` : ''}`,
        })

        const svgContent = readFileSync(resolve(inDir, inFile), 'utf-8')
        const svgNodes = createSvgNodes(svgContent)

        /** @type {import('./build/templates/iconTemplate.js').default} */
        const renderTemplate = (await import(templateDir)).default

        const result = renderTemplate(moduleName, svgNodes)

        const formatted = await prettierFormat(
            result,
            formatParam == 'svelte' ? 'svelte' : 'babel'
        )

        writeFileSync(outputPath, formatted)
    })
).then(async () => {
    console.log(
        ansiColors.green(
            `Successfully created ${ansiColors.yellow(`.${formatParam}`)} files for ${ansiColors.yellow(`${files.length} files`)} in ${ansiColors.cyan(outDirParam)}!`
        )
    )

    if (indexDirParam) {
        const indexOutDir = resolve(process.cwd(), indexDirParam)

        const indexTemplate = modules
            .map(({ name, path, friendlyName }) => {
                // Aliases: Alias -> Icon in friendly form

                // For backwards compatibility (removes Icon from the end)
                const camelModuleName = camelCase(friendlyName)

                const aliases = Object.keys(lockfile.aliases ?? {}).filter(
                    k => lockfile.aliases[k] == friendlyName
                )

                const aliasExports = aliases
                    .map(alias => [
                        pascalCase(alias) + 'Icon',
                        ...(libParam == 'vanilla' ? [camelCase(alias)] : []),
                    ])
                    .flat()

                const exportNames = [
                    ...(libParam == 'vanilla' ? [camelModuleName] : [name.slice(0, -4)]), // Camel name or Camel name without icon
                    ...aliasExports, // Aliases
                ]
                    .map(e => `${libParam == 'svelte' ? 'default' : name} as ${e}`)
                    .filter((e, i, a) => a.indexOf(e) === i)

                exportNames.unshift(libParam == 'svelte' ? `default as ${name}` : name)

                // Name with Icon at end and camel name
                return `export { ${exportNames.join(', ')} } from '${path}'`
            })
            .join('\n')

        writeFileSync(indexOutDir, indexTemplate)
        console.log(
            ansiColors.green(
                `Successfully created icons index at ${ansiColors.cyan(indexDirParam)}!`
            )
        )
    }
    if (shouldCreateDataFiles) {
        const formatAndWrite = async (data, file) => {
            const formatted = await prettierFormat(
                'export default ' + JSON.stringify(data),
                'babel'
            )

            writeFileSync(resolve(process.cwd(), 'src', file), formatted)
        }

        const iconListData = Object.keys(icons)
            .map(name => name)
            .sort()

        const categoryData = Object.values(icons)
            .map(({ category }) => category)
            .filter((item, index, array) => array.indexOf(item) === index)
            .sort()

        await formatAndWrite(iconListData, `iconList.${formatParam}`)
        console.log(ansiColors.green(`Successfully created icon list!`))

        await formatAndWrite(categoryData, `categories.${formatParam}`)
        console.log(ansiColors.green(`Successfully created category list!`))
    }
})
