<script setup lang="ts">
import { computed, ref } from 'vue'
import { filterIcons } from '../../composables/IconSearch'
import { Icon, IconAction, IconEntry } from '../../composables/types'
import { customizationData } from '../../composables/useCustomizations'
import { fetchVersion, VersionData } from '../../composables/versionData'
import IconDetails from './details/IconDetails.vue'
import IconList from './IconList.vue'
import IconSearch from './IconSearch.vue'
import NoResults from './NoResults.vue'
import VersionSelection from './VersionSelection.vue'
import { Lockfile } from '../../composables/useLockfile'

const query = ref('')
const selectedIcon = ref(null)
const selectedIconName = ref('')
const selectedVersion = ref('')
const icons = ref({})
const lockfile = ref({} as Lockfile)
const versionData = ref({} as VersionData)
const codepoints = ref({})
const length = computed(() => Object.entries(icons.value).length)

const filteredIcons = computed(() =>
    query.value !== '' ? ref(addEvents(filterIcons(icons.value, query.value))) : icons
)

function addEvents(ics: Record<string, Icon>): Record<string, IconAction> {
    return Object.fromEntries(
        Object.entries(ics).map(([name, data]) => {
            const li = lockfile.value.getIcon(name)
            return [
                name,
                {
                    action: selectIcon,
                    new: li.added == selectedVersion.value,
                    updated: li.updated == selectedVersion.value,
                    ...data,
                },
            ]
        })
    )
}

async function updateVersion(v: string) {
    const data = await fetchVersion(v)
    versionData.value = data
    selectedVersion.value = data.version
    lockfile.value = data.lockfile
    icons.value = addEvents(data.icons)
    codepoints.value = data.codepoints
}

function selectIcon(ic: IconEntry) {
    selectedIcon.value = ic
    selectedIconName.value = ic[0]
}
</script>
<template>
    <div class="IconPage" :style="{
        '--customize-color': customizationData.color,
        '--customize-stroke-width': customizationData.strokeWidth,
        '--customize-radius':
            +customizationData.cornerRadius > 0.5
                ? `${customizationData.cornerRadius}px`
                : undefined,
        '--customize-size': customizationData.size
            ? `${customizationData.size}px`
            : undefined,
        '--customize-outline-stroke-width':
            customizationData.strokeFilledElements &&
                +customizationData.strokeWidth > 1.5
                ? +customizationData.strokeWidth - 1.5
                : undefined,
    }">
        <main>
            <div class="group">
                <IconSearch :placeholder="`Search ${length} icons`"
                    v-model="query" />
                <Suspense>
                    <VersionSelection @version-change="updateVersion" />
                </Suspense>
            </div>

            <IconList v-if="Object.entries(filteredIcons.value).length > 0"
                :icons="filteredIcons.value" :query
                :selectedIcon="selectedIconName" />

            <NoResults v-else :query />
        </main>
        <IconDetails :icon="selectedIcon" :version-data />
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
