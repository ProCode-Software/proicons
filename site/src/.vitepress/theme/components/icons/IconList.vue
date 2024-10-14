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

            <h2 class="categoryTitle"><a :href="`#${kebabCase(category)}`">{{ category }}</a></h2>

            <div class="categoryIconsList">
                <IconItem v-for="icon in iconsInCategory"
                    :icon="icon" />
            </div>
        </section>
    </div>
</template>
<style lang="scss" scoped>
.IconList {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;

    &>section+section .categoryTitle {
        border-top: 1px solid var(--vp-c-divider);
        padding-top: 20px;
    }
}

.categoryTitle {
    letter-spacing: -0.02em;
    line-height: 32px;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
}

.categoryIconsList {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    width: 100%;
    align-items: baseline;
    gap: 15px;
}
</style>