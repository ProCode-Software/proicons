<script setup lang="ts">
import VPSidebarGroup from "vitepress/dist/client/theme-default/components/VPSidebarGroup.vue";
import { data } from '../../../data/fetchIcons.data'
import { kebabCase } from "../../composables/rename";
const { icons }: { icons: Record<string, { name: string, category: string }> } = data

const allCategories = Object.entries(icons)
    .map(
        ([name, { category }]) => { return category })

const categories = allCategories
    .filter((c, i, a) => a.indexOf(c) === i)

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
