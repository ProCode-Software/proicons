<script setup lang="ts">
import { getPascalName, pascalCase } from '@proicons/shared'
import * as icons from './icons'
import { ProIconAttributes } from './types'
import { computed } from 'vue'

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

const pascalName = computed(() => {
    if (!icon) throw new TypeError("An 'icon' attribute is required.")

    const pascalName = getPascalName(icons, icon)
    if (!pascalName) throw new Error(`Icon '${icon}' not found.`)
    return pascalName
})
</script>

<template>
    <component :is="icons[pascalName]" v-bind="{ ...props }" />
</template>
