<script setup lang="ts">
import { computed } from "vue";
import { customizationData, useSvgVariables } from "../../composables/useCustomizations";

const { icon, selected } = defineProps<{ icon, selected: boolean }>()

const [key, value] = icon

const svg = computed(() => useSvgVariables(value.icon, customizationData))
</script>

<template>
    <button :class="{ IconListItem: true, selected }"
        tabindex="0" role="button"
        @click="value.action(icon)">
        <div class="iconWrapper" v-html="svg" />
        <span class="iconLabel">{{ key }}</span>
    </button>
</template>
<style scoped lang="scss">
.IconListItem {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    text-align: center;
    justify-content: flex-start;
    font-size: 14px;
    aspect-ratio: 1 / 1;
    border-radius: 10px;
    transition: background .2s, color .2s;
    cursor: pointer;
    height: 100%;
    width: 100%;
    padding: 10px;
    padding-top: 20px;

    &:hover {
        background: var(--vp-c-bg-alt);
    }

    &:focus-visible {
        outline: none;
        box-shadow: inset 0 0 0 1.5px var(--vp-c-brand-1);
    }

    &.selected,
    &.selected .iconLabel {
        color: var(--vp-c-brand-1);
        font-weight: 500;
    }

    .iconLabel {
        line-height: 130%;
        font-size: 14px;
        color: var(--vp-c-text-2);
        overflow-wrap: anywhere;
    }
}
</style>
<style>
.dark .IconListItem svg {
    color: #fff;
}
.IconListItem svg {
    color: var(--customize-color, inherit);
    width: var(--customize-size, 24px);
    height: var(--customize-size, 24px);
}
</style>