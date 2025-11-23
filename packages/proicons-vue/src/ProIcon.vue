<script setup lang="ts">
import { kebabCase, pascalCase } from '@proicons/shared'
import { ProIconAttributes } from './types'
import * as icons from './icons'

type IconEnum<T extends string> = T extends `${infer Base}Icon` ? Base : T
type IconProp = IconEnum<keyof typeof icons> | (string & {})

const { icon, ...props } = defineProps<
    ProIconAttributes & {
        /**
         * The name of the icon in kebabCase, PascalCase, Friendly Form, or camelCase. Case-insensitive
         * @example These are allowed:
         * ```vue
         * <ProIcon icon="add square" />
         * <ProIcon icon="home" />
         * <ProIcon icon="AddIcon" />
         * <ProIcon icon="bookmarkMultiple" />
         * ```
         */
        icon: IconProp
    }
>()

if (!icon) {
    throw new TypeError("An 'icon' attribute is required.")
}

function getPascalName(name: string) {
    const lowerName = name.toLowerCase()
    const iconEntries = Object.keys(icons)
    
    return iconEntries.find(pascalName => {
        const lowerIconName = pascalName.replace(/Icon$/, '').toLowerCase()

        return (
            lowerIconName == lowerName ||
            lowerIconName + 'icon' == lowerName ||
            kebabCase(lowerIconName) == lowerName ||
            lowerIconName == pascalCase(lowerName)
        )
    })
}

const friendlyName = getPascalName(icon)

if (!friendlyName) {
    throw new Error(`Icon '${icon}' not found.`)
}

const pascalName = pascalCase(friendlyName) + 'Icon'
</script>

<template>
    <component :is="icons[pascalName]" v-bind="{ ...props }" />
</template>
