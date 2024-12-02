import { kebabCase, pascalCase } from '../../../../../src/rename';

export function getCodeExamples(iconName: string) {
    return {
        HTML: {
            language: 'html',
            code: [
                `<i proicon="${kebabCase(iconName)}"></i>\n`,
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
                `import { ${pascalCase(iconName)}Icon } from 'proicons'`,
                `${pascalCase(iconName)}Icon.toSvg()`
            ].join('\n\n'),
            entry: `${pascalCase(iconName)}Icon.toSvg()`
        },
        React: {
            language: 'jsx',
            code: [
                `import { ${pascalCase(iconName)}Icon } from '@proicons/react'`,
                `<${pascalCase(iconName)}Icon />`
            ].join('\n\n'),
            entry: `<${pascalCase(iconName)}Icon />`,
        },
        Vue: {
            language: 'vue',
            code: [
                `<script setup>`,
                `import { ${pascalCase(iconName)}Icon } from '@proicons/vue'`,
                `</script>\n`,
                `<template>`,
                `    <${pascalCase(iconName)}Icon />`,
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