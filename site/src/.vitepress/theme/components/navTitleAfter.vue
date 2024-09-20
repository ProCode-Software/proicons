<script setup lang="ts">
import { useData } from 'vitepress/dist/client/theme-default/composables/data';
//@ts-ignore
import { data } from './fetchVersion.data'

console.log(useData())
</script>

<template>
    <a href="https://github.com/ProCode-Software/proicons">
        <span class="titleAfter">v{{ data.version }}</span>
    </a>
</template>