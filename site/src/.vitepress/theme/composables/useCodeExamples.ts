import { camelToKebabCase, kebabCase, pascalCase } from '../../../../../src/rename';
import { defaultCustomizations, type CustomizationData } from './useCustomizations';

type Format = 'jsx' | 'vue' | 'html'

function formatJson(object: Record<string, any>): string {
    const length = Object.keys(object).length

    const formatted = JSON.stringify(object, null, 4)
        .replace(/"([^"]+)":/g, '$1:') // Remove quoted keys
        .replace(/"(\d+(?:\.\d+)?)"/g, '$1') // Unquote numbers
    return length > 2
        ? formatted
        : formatted.replace(/\n\s*/g, ' ') // Single-line if short
}

function filterModified(object: Record<string, any>) {
    return Object.entries(object).filter(([key, value]) => {
        const allowed = [value, +value]
        return value && !allowed.includes(defaultCustomizations[key])
    })
}

function customizationDataToString(data: CustomizationData, format: Format): string {
    return filterModified(data).map(([k, value]) => {
        const key = format == 'html'
            ? (k == 'strokeFilledElements' ? 'outline' : camelToKebabCase(k))
            : k
        const isBool = typeof value == 'boolean'
        const isNumber = !isBool && (typeof value == 'number' || !isNaN(+value))
        const quotes = (str: string) => `"${str}"`
        const braces = (str: string) => `{${str}}`

        return [
            isNumber && format == 'vue' ? ':' : '',
            key,
            isBool ? ''
                : `=${isNumber && format == 'jsx'
                    ? braces(value)
                    : quotes(value)
                }`
        ].join('')
    }).join(' ')
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
    return {
        HTML: {
            language: 'html',
            code: [
                `<i proicon="${kebabCase(iconName)}"${attrs('html', customizations)}></i>\n`,
                `<script src="https://unpkg.com/proicons"></script>`,
                `<script>`,
                `    proicons.replace()`,
                `</script>`
            ].join('\n'),
            entry: `<i proicon="${kebabCase(iconName)}"></i>`,
        },
        Vanilla: {
            language: 'javascript',
            code: [
                `import { ${pascalCase(iconName)}Icon } from 'proicons'\n`,
                `document.write(`,
                `    ${pascalCase(iconName)}Icon.toSvg(${indent(customizationDataToJS(customizations))})`,
                `)`
            ].join('\n'),
            entry: `${pascalCase(iconName)}Icon.toSvg()`
        },
        React: {
            language: 'jsx',
            code: [
                `import { ${pascalCase(iconName)}Icon } from '@proicons/react'\n`,
                `export default function App() {`,
                '    return (',
                `        <${pascalCase(iconName)}Icon${attrs('jsx', customizations)} />`,
                '    )',
                '}'
            ].join('\n'),
            entry: `<${pascalCase(iconName)}Icon />`,
        },
        Svelte: {
            language: 'svelte',
            code: [
                `<script>`,
                `import ${pascalCase(iconName)}Icon from '@proicons/svelte'`,
                `</script>\n`,
                `<${pascalCase(iconName)}Icon${attrs('jsx', customizations)} />`,
            ].join('\n'),
            entry: `<${pascalCase(iconName)}Icon />`,
        },
        Vue: {
            language: 'vue',
            code: [
                `<script setup>`,
                `import { ${pascalCase(iconName)}Icon } from '@proicons/vue'`,
                `</script>\n`,
                `<template>`,
                `    <${pascalCase(iconName)}Icon${attrs('vue', customizations)} />`,
                `</template>`
            ].join('\n'),
            entry: `<${pascalCase(iconName)}Icon />`,
        },
        Webfont: {
            language: 'html',
            code: [
                `<link rel="stylesheet" href="https://unpkg.com/@proicons/webfont">`,
                `<i class="proicon proicon-${kebabCase(iconName)}"></i>`
            ].join('\n\n'),
            entry: `<i class="proicon proicon-${kebabCase(iconName)}"></i>`,
        },
        Roblox: {
            language: 'luau',
            code: [
                `local ProIcons = require(path.to.ProIcons)`,
                `Instance.new('ImageLabel').Image = ProIcons.${pascalCase(iconName)}.id`
            ].join('\n\n'),
            entry: `ProIcons.${pascalCase(iconName)}.id`,
        }
    }
}