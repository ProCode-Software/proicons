<script setup lang="ts">
import { useData } from 'vitepress/dist/client/theme-default/composables/data';
//@ts-ignore
import { data } from './fetchVersion.data'

console.log(useData())
</script>

<template>
    <a href="https://github.com/ProCode-Software/proicons">
        <span class="titleAfterBadge">v{{ data.version }}</span>
    </a>
</template>
<style scoped>
.titleAfterBadge {
    font-size: 14px;
    font-weight: 500;
    padding: 4px 6px;
    border-radius: 6px;
    margin-left: 6px;
    background: var(--vp-c-gray-soft);
    color: var(--vp-c-text-2);
}
</style>