<script setup lang="ts">
import { ref, computed } from 'vue'
import { data } from '../../../data/fetchIcons.data'
import { filterIcons } from '../../composables/IconSearch'
import IconList from "./IconList.vue";
import IconSearch from "./IconSearch.vue";
import NoResults from "./NoResults.vue";
import IconDetailSidebar from "./IconDetailSidebar.vue";
import { selectedIcon } from "../../composables/IconInfo";

const { icons } = data

const query = ref('')
const selectedIcon = ref(null)

const filteredIcons = computed(() => query.value.length > 1
    ? filterIcons(icons, query.value) : icons)


function selectIcon(ic) {
    selectedIcon.value = ic
    console.log(ic);
    
}
</script>
<template>
    <div class="IconPage">
        <main>
            <IconSearch
                :placeholder="`Search ${Object.entries(icons).length} icons`"
                v-model="query" />
            <IconList
                v-if="Object.entries(filteredIcons).length"
                :icons="filteredIcons" :query="query" @foward-icon="selectIcon" />

            <NoResults v-else :query="query" />
        </main>
        <IconDetailSidebar :icon="selectedIcon" />
    </div>
</template>
<style lang="scss" scoped>
.IconPage {
    padding: 20px;
    display: flex;
    flex-direction: row;
    gap: 40px;
    align-items: flex-start;

    &>main {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
    }
}
</style>