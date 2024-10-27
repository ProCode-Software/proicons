<script setup lang="ts">
import { useData, withBase } from 'vitepress'

const { light, dark, alt, className, src } = defineProps<{
    light?: string, dark?: string, alt?: string, className: string, src: string
}>()

const lightImage = withBase(light ?? src.slice(0, -4) + '_light' + src.slice(-4))
const darkImage = withBase(dark ?? src.slice(0, -4) + '_dark' + src.slice(-4))


const isDark = useData().isDark
</script>
<template>
    <img v-if="!isDark" :src="lightImage" :alt
        :class="className" />

    <img v-if="isDark" :src="darkImage" :alt
        :class="className" />
</template>