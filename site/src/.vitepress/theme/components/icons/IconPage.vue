<script setup lang="ts">
import { ref, computed } from 'vue'
import { data } from '../../../data/fetchIcons.data'
import { filterIcons } from '../../composables/IconSearch'
import IconList from "./IconList.vue";
import IconSearch from "./IconSearch.vue";
import NoResults from "./NoResults.vue";


const { icons } = data

const query = ref('')

const filteredIcons = computed(() => query.value.length > 1
    ? filterIcons(icons, query.value) : icons)
</script>
<template>
    <div class="IconPage">
        <IconSearch
            :placeholder="`Search ${Object.entries(icons).length} icons`"
            v-model="query" />

        <IconList
            v-if="Object.entries(filteredIcons).length"
            :icons="filteredIcons" />
        <NoResults v-else :query="query" />
    </div>
</template>
<style lang="scss" scoped>
.IconPage {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>