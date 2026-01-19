import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { IconNode, createSvgNodes } from './createSvgNodes.ts'
import { prettierFormat } from '../helpers/prettierFormat.ts'
import { kebabCase, pascalCase } from '@proicons/shared'

export interface WorkerData {
    iconName: string
    inDir: string
    outDir: string
    templateDir: string
    format: string
}

export interface WorkerResponse {
    name: string
    friendlyName: string
    path: string
}

export default async function generateIconModule(data: WorkerData): Promise<WorkerResponse> {
    const { iconName, inDir, outDir, templateDir, format } = data

    const inFile = kebabCase(iconName) + '.svg'
    const moduleName = pascalCase(iconName) + 'Icon'
    const outputPath = resolve(outDir, `${moduleName}.${format}`)

    const svgContent = readFileSync(resolve(inDir, inFile), 'utf-8')
    const svgNodes = createSvgNodes(svgContent)

    const renderTemplate: (moduleName: string, nodes: IconNode[]) => string = (
        await import(templateDir)
    ).default

    const result = renderTemplate(moduleName, svgNodes)

    const formatted = await prettierFormat(
        result,
        format === 'svelte' ? 'svelte' : 'babel-ts'
    )

    writeFileSync(outputPath, formatted)

    return {
        name: moduleName,
        friendlyName: iconName,
        path: `./icons/${moduleName}${format !== 'ts' ? `.${format}` : ''}`,
    }
}