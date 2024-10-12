<script setup lang="ts">
import { useData } from 'vitepress'
import CustomizerField from './CustomizerField.vue'
import VPSidebarItem from "vitepress/dist/client/theme-default/components/VPSidebarItem.vue";

const item = 0
const type: 'color' | 'slider' = 'color'
</script>

<template>
    <div class="group">
        <VPSidebarItem
            :item="{ text: 'Customize', collapsed: false, items: [{}] }"
            :depth="0" class="customizeLabel" />

        <div class="IconsCustomizer">
            <CustomizerField type="slider" label="Size"
                :defaultValue="24" :min="16" :max="48" />

            <CustomizerField type="slider"
                label="Stroke width" :defaultValue="1.5"
                :min="1" :max="3" :step="0.05" />

            <CustomizerField type="color" label="Color"
                defaultValue="#000" />

            <details>
                <summary>Advanced options</summary>
                <div>
                    <CustomizerField type="slider"
                        label="Corner radius"
                        :defaultValue="24" :min="16"
                        :max="48" />
                    <CustomizerField type="toggle"
                        label="Outline fills"
                        :defaultValue="false" />
                </div>
            </details>
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

.IconsCustomizer {
    font-size: 14px;

    summary {
        font-weight: 500;
    }
}

.IconsCustomizer,
.IconsCustomizer div {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.customizeLabel {
    padding-bottom: 0 !important;
    padding-top: 10px;

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
}

details[open] summary {
    padding-bottom: 10px;

    &::before {
        transform: rotate(180deg);

    }
}
</style>