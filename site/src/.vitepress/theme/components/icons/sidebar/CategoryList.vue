<script setup lang="ts">
import VPSidebarGroup from "vitepress/dist/client/theme-default/components/VPSidebarGroup.vue";
import { kebabCase } from "../../../composables/rename";
import { categories } from 'proicons'

const categoryGroup = [{
    text: 'Categories',
    collapsed: false,
    items: [
        {
            text: '',
            items: categories.sort().map(c => { return { text: c, link: `#${kebabCase(c)}` } })
        }
    ]
}]
</script>

<template>
    <VPSidebarGroup :items="categoryGroup" />
</template>
