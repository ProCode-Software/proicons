<script setup lang="ts">
import { kebabCase } from '../../../src/rename'
import { ProIconAttributes } from './types'
import * as icons from './icons'

type IconEnum<T extends string> = T extends `${infer Base}Icon` ? Base : T
type IconProp = IconEnum<keyof typeof icons> | (string & {})

const { icon, ...props } = defineProps<
    /* @vue-ignore */
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

function getPascalName(name: string) {
    return (
        Object.entries(icons).find(([iconName, { props: iconProps }]) => {
            // @ts-ignore
            const friendlyName = iconProps.name
            const lowerName = name.toLowerCase()
            const lowerIconName = iconName.slice(0, -4).toLowerCase()

            if (lowerIconName == lowerName || lowerIconName + 'icon' == lowerName) {
                // Camel or pascal case
                return true
            } else if (kebabCase(lowerIconName) == name) {
                // Kebab case
                return true
            } else if (friendlyName.toLowerCase() == lowerName) {
                // Friendly form
                return true
            }
        })?.[0] ?? undefined
    )
}

const iconName = getPascalName(icon)

if (!iconName) {
    throw new Error(`Icon '${icon}' not found.`)
}
</script>

<template>
    <component :is="icons[iconName]" v-bind="{ ...props }" />
</template>
