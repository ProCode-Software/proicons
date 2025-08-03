import { camelToKebabCase, kebabCase, pascalCase } from '../../../../../src/rename'
import { defaultCustomizations, type CustomizationData } from './useCustomizations'

type Format = 'jsx' | 'vue' | 'html'

function formatJson(object: Record<string, any>): string {
    const length = Object.keys(object).length

    const formatted = JSON.stringify(object, null, 4)
        .replace(/"([^"]+)":/g, '$1:') // Remove quoted keys
        .replace(/"(\d+(?:\.\d+)?)"/g, '$1') // Unquote numbers
    return length > 2 ? formatted : formatted.replace(/\n\s*/g, ' ') // Single-line if short
}

function filterModified(object: Record<string, any>) {
    return Object.entries(object).filter(([key, value]) => {
        const allowed = [value, +value]
        return value && !allowed.includes(defaultCustomizations[key])
    })
}

function customizationDataToString(data: CustomizationData, format: Format): string {
    return filterModified(data)
        .map(([k, value]) => {
            const key =
                format == 'html'
                    ? k == 'strokeFilledElements'
                        ? 'outline'
                        : camelToKebabCase(k)
                    : k
            const isBool = typeof value == 'boolean'
            const isNumber = !isBool && (typeof value == 'number' || !isNaN(+value))
            const quotes = (str: string) => `"${str}"`
            const braces = (str: string) => `{${str}}`

            return [
                isNumber && format == 'vue' ? ':' : '',
                key,
                isBool
                    ? ''
                    : `=${isNumber && format == 'jsx' ? braces(value) : quotes(value)}`,
            ].join('')
        })
        .join(' ')
}

function attrs(format: Format, data?: CustomizationData): string | undefined {
    if (!data) return ''
    const cData = customizationDataToString(data, format)
    return cData ? ` ${cData}` : ''
}

function customizationDataToJS(data?: CustomizationData): string | undefined {
    if (!data) return ''
    const filtered = filterModified(data)
    if (filtered.length < 1) return ''
    return formatJson(Object.fromEntries(filtered)) ?? ''
}

export function indent(text: string): string {
    return text.replace(/\n/gm, '\n    ')
}

export function getCodeExamples(iconName: string, customizations?: CustomizationData) {
    const pascalName = pascalCase(iconName),
        kebabName = kebabCase(iconName)
    return {
        HTML: {
            language: 'html',
            code: [
                `<i proicon="${kebabName}"${attrs('html', customizations)}></i>\n`,
                `<script src="https://unpkg.com/proicons"></script>`,
                `<script>`,
                `    proicons.replace()`,
                `</script>`,
            ].join('\n'),
            entry: `<i proicon="${kebabName}"></i>`,
        },
        Vanilla: {
            language: 'javascript',
            code: [
                `import { ${pascalName}Icon } from 'proicons'\n`,
                `document.write(`,
                `    ${pascalName}Icon.toSvg(${indent(customizationDataToJS(customizations))})`,
                `)`,
            ].join('\n'),
            entry: `${pascalName}Icon.toSvg()`,
        },
        React: {
            language: 'jsx',
            code: [
                `import { ${pascalName}Icon } from '@proicons/react'\n`,
                `export default function App() {`,
                `    return <${pascalName}Icon${attrs('jsx', customizations)} />`,
                '}',
            ].join('\n'),
            entry: `<${pascalName}Icon />`,
        },
        Svelte: {
            language: 'svelte',
            code: [
                `<script>`,
                `import ${pascalName}Icon from '@proicons/svelte'`,
                `</script>\n`,
                `<${pascalName}Icon${attrs('jsx', customizations)} />`,
            ].join('\n'),
            entry: `<${pascalName}Icon />`,
        },
        Vue: {
            language: 'vue',
            code: [
                `<script setup>`,
                `import { ${pascalName}Icon } from '@proicons/vue'`,
                `</script>\n`,
                `<template>`,
                `    <${pascalName}Icon${attrs('vue', customizations)} />`,
                `</template>`,
            ].join('\n'),
            entry: `<${pascalName}Icon />`,
        },
        Webfont: {
            language: 'html',
            code: [
                `<link rel="stylesheet" href="https://unpkg.com/@proicons/webfont">`,
                `<i class="proicon proicon-${kebabName}"></i>`,
            ].join('\n\n'),
            entry: `<i class="proicon proicon-${kebabName}"></i>`,
        },
    }
}
