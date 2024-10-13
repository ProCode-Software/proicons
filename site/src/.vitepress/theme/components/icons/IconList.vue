<script setup lang="ts">
import IconItem from "./IconItem.vue";
import { getCategories } from '../../composables/categories'
import { kebabCase } from "../../composables/rename";

const isDevelopment = import.meta.env.DEV

interface Icon {
    icon: string,
    category: string,
    tags: string[]
}
const { icons } = defineProps<{ icons: Record<string, Icon> }>()
</script>
<template>
    <div class="IconList">
        <p :hidden="isDevelopment">Coming Soon</p>

        <section :hidden="!isDevelopment"
            v-for="[category, iconsInCategory] in Object.entries(getCategories(icons))"
            :id="kebabCase(category)">

            <h2 class="categoryTitle">{{ category }}</h2>

            <div class="categoryIconsList">
                <IconItem v-for="icon in iconsInCategory"
                    :icon="icon" />
            </div>
        </section>
    </div>
</template>
<style lang="scss" scoped></style>