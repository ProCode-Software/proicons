<script setup lang="ts">
import { ChevronDownIcon } from "@proicons/vue";
import { computed, ref } from "vue";
import { copyChar, copyDataUri, copySvg } from "../../../composables/copyData";
import { Codepoints, IconEntry } from "../../../composables/types";
import Flyout from '../Flyout.vue';

const { icon, codepoints } = defineProps<{ icon: IconEntry, codepoints: Codepoints }>()
const iconName = computed(() => icon[0])
const iconData = computed(() => icon[1])

const chevronSize = 18
const viewCodeOpen = ref(false),
    copyOpen = ref(false),
    downloadOpen = ref(false)

const items = {
    ViewCode: [
        { text: 'HTML' },
        { text: 'React' },
        { text: 'Vue' }
    ],
    Copy: [
        { text: 'Copy SVG', action: () => copySvg(iconData) },
        { text: 'Copy Data URL', action: () => copyDataUri(iconData) },
        { text: 'Copy Glyph', action: () => copyChar(iconName, codepoints) }
    ],
    Download: [
        { text: 'Download SVG' },
        { text: 'Download PNG' }
    ]
}
</script>
<template>
    <div class="iconActions">
        <div style="position: relative; width: 100%;">
            <button class="VPButton medium alt"
                @click="$emit('showDrawer')">
                View code
            </button>
        </div>
        <div style="position: relative; width: 100%;">
            <Flyout :items="items.Copy"
                v-model:open="copyOpen"
                :position="['top', 'right']">

                <template #trigger="{ toggle }">
                    <button class="VPButton medium alt"
                        @click="toggle">
                        Copy
                        <ChevronDownIcon
                            class="dropdownIcon"
                            :size="chevronSize" />
                    </button>
                </template>
            </Flyout>
        </div>
        <div style="position: relative; width: 100%;">
            <Flyout :items="items.Download"
                v-model:open="downloadOpen"
                :position="['top', 'right']">

                <template #trigger="{ toggle }">
                    <button class="VPButton medium alt"
                        @click="toggle">
                        Download
                        <ChevronDownIcon
                            class="dropdownIcon"
                            :size="chevronSize" />
                    </button>
                </template>
            </Flyout>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.iconActions {
    padding-right: 20px;
    font-size: 14px;
    display: flex;
    gap: 8px;
    justify-content: center;
    width: 100%;
    grid-area: d;

    .VPButton {
        background: var(--vp-c-gray-2);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        width: 100%;
        padding: 0px 15px;

        &:hover {
            background: var(--vp-c-gray-1)
        }

        .VPIcon {
            width: 20px;
            height: 20px;
            display: flex;
        }
    }

    @media (max-width: 700px) {
        & {
            flex-wrap: wrap;
            padding: 0px 20px;

            .VPButton {
                width: auto;
            }

            &>div {
                width: auto !important;
            }
        }
    }
}
</style>