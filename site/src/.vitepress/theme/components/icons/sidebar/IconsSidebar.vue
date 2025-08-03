<script setup lang="ts">
import { useData } from 'vitepress'
import IconsCustomizer from './IconsCustomizer.vue'
import CategoryList from './CategoryList.vue'

const { page } = useData()
</script>

<template>
    <div class="iconsSidebar" v-if="page.relativePath.startsWith('icons')">
        <IconsCustomizer />
        <CategoryList />
    </div>
    <!-- <VPSidebarGroup /> -->
</template>
