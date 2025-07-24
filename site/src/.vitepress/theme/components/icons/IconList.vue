<script setup lang="ts">
import { computed } from 'vue'
import { kebabCase } from '../../composables/rename'
import { IconAction, IconActionEntry } from '../../composables/types'
import {
    getCategories,
    sortCategoryEntries,
    sortSearchResults,
} from '../../composables/useCategories'
import IconItem from './IconItem.vue'

const { icons, query, selectedIcon } = defineProps<{
    icons: Record<string, IconAction>
    query?: string
    selectedIcon?: string | undefined
}>()

const iconsSearch = computed<[string, IconActionEntry[]][]>(() => {
    return query
        ? [[`Results for "${query}"`, sortSearchResults(Object.entries(icons))]]
        : sortCategoryEntries(Object.entries(getCategories(icons)))
})
</script>
<template>
    <div class="IconList">
        <section
            v-for="[category, iconsInCategory] in iconsSearch"
            :id="kebabCase(category)"
        >
            <h2 class="categoryTitle">
                <a :href="query ? undefined : `#${kebabCase(category)}`">
                    {{ category }}
                    <span class="badge">{{ iconsInCategory.length }}</span>
                </a>
            </h2>

            <div class="categoryIconsList" :key="category">
                <IconItem
                    v-for="icon in iconsInCategory"
                    :icon="icon"
                    :key="icon[0]"
                    :selected="icon[0] == selectedIcon"
                />
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

    & > section + section .categoryTitle {
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

    & > a {
        display: flex;
        align-items: center;
        gap: 10px;
        transition: 0.15s;

        &:hover {
            color: var(--vp-c-brand-1);
        }
    }

    .badge {
        font-size: 13px;
        padding: 3px 6px;
        letter-spacing: normal;
        background: var(--vp-c-gray-3);
        color: var(--vp-c-text-2);
        border-radius: 100px;
        display: inline-flex;
        font-weight: 600;
        min-width: 24px;
        height: 24px;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
}

.categoryIconsList {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    width: 100%;
    align-items: start;
    gap: 5px;
}
</style>
