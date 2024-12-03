<script setup lang="ts">
import { useData } from 'vitepress'
import CustomizerField from './CustomizerField.vue'
import VPSidebarItem from "vitepress/dist/client/theme-default/components/VPSidebarItem.vue";
import VPButton from "vitepress/dist/client/theme-default/components/VPButton.vue";
import { customizationData, resetToDefaults } from "../../../composables/useCustomizations";
</script>

<template>
    <div class="group customizerSbGroup">
        <VPSidebarItem
            :item="{ text: 'Customize', collapsed: false, items: [{}] }"
            :depth="0" class="customizeLabel" />

        <div class="IconsCustomizer">
            <CustomizerField type="slider" label="Size"
                :defaultValue="24" :min="16" :max="48"
                bind="size" :model="customizationData" />

            <CustomizerField type="slider"
                label="Stroke width" :defaultValue="1.5"
                :min="1" :max="3" :step="0.05" suffix="px"
                bind="strokeWidth"
                :model="customizationData" />

            <CustomizerField type="color" label="Color"
                defaultValue="currentColor" bind="color"
                :model="customizationData" />

            <details>
                <summary>Advanced options</summary>
                <div>
                    <CustomizerField type="slider"
                        label="Corner radius"
                        :defaultValue="-0.5" :min="-0.5"
                        bind="cornerRadius"
                        :model="customizationData" :max="5"
                        suffix="px" :step="0.5"
                        tooltip="May not apply to all icons. Set to -1 to ignore" />

                    <CustomizerField type="toggle"
                        label="Outline fills" bind="strokeFilledElements"
                        :model="customizationData"
                        :defaultValue="false"
                        tooltip="Add strokes to filled SVG elements for balance" />
                </div>
            </details>

            <VPButton size="medium" theme="alt" text="Reset to defaults" @click="resetToDefaults" />
        </div>
    </div>
</template>
<style lang="scss" scoped>
.group {
    padding-bottom: 24px;

    &:has(.collapsed) {
        padding-bottom: 10px;
    }
}

@media (min-width: 960px) {
    .customizerSbGroup {
        padding-top: 10px;
        width: calc(var(--vp-sidebar-width) - 64px);
    }
}

.IconsCustomizer {
    font-size: 14px;

    summary {
        font-weight: 500;
    }
}

.IconsCustomizer, .IconsCustomizer details > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.customizeLabel {
    padding-bottom: 0 !important;

    &.collapsed+.IconsCustomizer {
        display: none;
    }
}

details summary {
    list-style-type: none;
    display: flex;
    align-items: center;
    gap: 3px;
    color: var(--vp-c-text-2);
    transition: color .25s;
    cursor: pointer;

    &:before {
        content: '';
        width: 20px;
        height: 20px;
        display: inline-flex;
        background-size: cover;

        --icon: url("https://raw.githubusercontent.com/ProCode-Software/proicons/main/icons/svg/chevron-down.svg");
        -webkit-mask: var(--icon) no-repeat;
        mask: var(--icon) no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
        background-color: currentColor;
        color: inherit;

        transition: transform .2s ease-out;
    }

    &:hover {
        color: var(--vp-c-text-1);
    }
}

details[open] summary {
    padding-bottom: 10px;

    &::before {
        transform: rotate(180deg);

    }
}
</style>