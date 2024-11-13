<script setup lang="ts">
import { ref } from 'vue'
import { type ProIconAttributes } from './types'
import * as icons from './icons'

type IconEnum<T extends string> = T extends `${infer Base}Icon` ? Base : T
type IconProp = IconEnum<keyof typeof icons> | (string & {})

const props = defineProps<ProIconAttributes & { icon: IconProp }>()

const count = ref(0)
</script>

<template>
    <button type="button" @click="count++">{{ icon }} count is {{ count }}</button>
</template>