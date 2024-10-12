<script setup lang="ts">
import { useData } from 'vitepress/dist/client/theme-default/composables/data';
//@ts-ignore
import { data } from './fetchVersion.data'
</script>

<template>
    <a :href="`https://github.com/ProCode-Software/proicons/releases/tag/${data.version}`" :title="`View v${data.version} on GitHub`">
        <span class="titleAfterBadge">v{{ data.version }}</span>
    </a>
</template>
<style scoped lang="scss">
.titleAfterBadge {
    font-size: 14px;
    font-weight: 500;
    padding: 4px 6px;
    border-radius: 7px;
    margin-left: 6px;
    background: var(--vp-c-gray-3);
    color: var(--vp-c-text-2);
    transition: background .15s;

    &:hover {
        background: var(--vp-c-gray-2);
    }
}
</style>