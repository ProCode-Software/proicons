<script setup lang="ts">
import VPSidebarGroup from "vitepress/dist/client/theme-default/components/VPSidebarGroup.vue";
import { data } from '../../../data/fetchIcons.data'
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
            items: categories.map(c => { return { text: c, link: `#${c}` } })
        }
    ]
}]
</script>

<template>
    <VPSidebarGroup :items="categoryGroup" />
</template>
