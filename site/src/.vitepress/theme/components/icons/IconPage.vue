<script setup lang="ts">
import { computed, ref } from 'vue';
import { filterIcons } from '../../composables/IconSearch';
import { Icon } from "../../composables/types";
import { fetchCodepoints, fetchIconsFromVersion } from "../../composables/versionData";
import IconDetails from "./details/IconDetails.vue";
import IconList from "./IconList.vue";
import IconSearch from "./IconSearch.vue";
import NoResults from "./NoResults.vue";
import VersionSelection from "./VersionSelection.vue";
import { customizationData } from "../../composables/useCustomizations";

const query = ref('')
const selectedIcon = ref(null)
const selectedIconName = ref('')
const selectedVersion = ref('')
const icons = ref({})
const lockfile = ref({})
const codepoints = ref({})
const length = computed(() => Object.entries(icons.value).length)

const filteredIcons = computed(() =>
    query.value.length > 0
        ? ref(addEvents(filterIcons(icons.value, query.value)))
        : icons
)

function addEvents(ics: Record<string, Icon>) {
    return Object.fromEntries(
        Object.entries(ics)
            .map(([name, data]) => {
                return [name, {
                    action: selectIcon,
                    ...data
                }]
            }))
}

async function updateVersion(v: string) {
    selectedVersion.value = v
    const fetchedData = await fetchIconsFromVersion(selectedVersion.value)
    const fetchedCodepoints = await fetchCodepoints(selectedVersion.value)
    const fetchedIcons = fetchedData.icons

    icons.value = addEvents(fetchedIcons)
    lockfile.value = fetchedData.lockfile
    codepoints.value = fetchedCodepoints
}

function selectIcon(ic) {
    selectedIcon.value = ic
    selectedIconName.value = ic[0]
}
</script>
<template>
    <div class="IconPage" :style="{
        '--customize-color': customizationData.color,
        '--customize-stroke-width': customizationData.strokeWidth,
        '--customize-radius': +customizationData.cornerRadius > 0.5
            ? `${customizationData.cornerRadius}px`
            : undefined,
        '--customize-size': customizationData.size
            ? `${customizationData.size}px`
            : undefined,
        '--customize-outline-stroke-width': customizationData.strokeFilledElements
            && +customizationData.strokeWidth > 1.5
            ? +customizationData.strokeWidth - 1.5
            : undefined
    }">
        <main>
            <div class="group">
                <IconSearch
                    :placeholder="`Search ${length} icons`"
                    v-model="query" />
                <Suspense>
                    <VersionSelection
                        @version-change="updateVersion" />
                </Suspense>
            </div>

            <IconList
                v-if="Object.entries(filteredIcons.value).length > 0"
                :icons="filteredIcons.value" :query="query"
                :selectedIcon="selectedIconName" />

            <NoResults v-else :query="query" />
        </main>
        <IconDetails :icon="selectedIcon"
            :lockfile="lockfile" :codepoints="codepoints" />
    </div>
</template>
<style lang="scss" scoped>
.IconPage {
    padding: 20px;
    display: flex;
    flex-direction: row;
    gap: 40px;
    align-items: flex-start;
    position: relative;

    .group {
        display: flex;
        flex-direction: row;
        gap: 10px;
        width: 100%;
    }

    &>main {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
    }
}
</style>