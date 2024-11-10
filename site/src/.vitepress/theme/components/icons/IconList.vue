<script setup lang="ts">
import IconItem from "./IconItem.vue";
import { getCategories, sortCategoryEntries, sortSearchResults } from '../../composables/categories'
import { kebabCase } from "../../composables/rename";
import { computed} from 'vue'

interface Icon {
    icon: string,
    category: string,
    tags: string[],
    score?: number
}
const { icons, query } = defineProps<{ icons: Record<string, Icon>, query?: string }>()

const iconsSearch = computed(() => {
    return query ?
        [[
            `Results for "${query}"`,
            sortSearchResults(Object.entries(icons))
        ]]
        : sortCategoryEntries(
            Object.entries(getCategories(icons))
        )
})

</script>
<template>
    <div class="IconList">
        <section
            v-for="[category, iconsInCategory] in iconsSearch"
            :id="kebabCase(category)">

            <h2 class="categoryTitle">
                <a :href="query ? undefined : `#${kebabCase(category)}`">{{
                    category }}</a>
            </h2>

            <div class="categoryIconsList" :key="category">
                <IconItem v-for="icon in iconsInCategory"
                    :icon="icon" :key="icon[0]" @select-icon="(ic) => $emit('fowardIcon', ic)" />
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
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    width: 100%;
    align-items: baseline;
    gap: 15px;
}
</style>