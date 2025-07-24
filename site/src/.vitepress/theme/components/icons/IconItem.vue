<script setup lang="ts">
import { computed } from 'vue'
import { Icon, IconAction, IconActionEntry, IconEntry } from '../../composables/types'
import { customizationData, useSvgVariables } from '../../composables/useCustomizations'

const { icon, selected } = defineProps<{ icon: IconActionEntry; selected: boolean }>()

const [key, value]: [string, IconAction] = icon

const svg = computed(() => useSvgVariables(value.icon, customizationData))
</script>

<template>
    <button :class="{ IconListItem: true, selected }" tabindex="0"
        role="button" @click="value.action(icon)">
        <div class="iconWrapper" v-html="svg" />
        <span class="iconLabel">{{ key }}</span>
        <div class="newBadge" v-if="value.new || value.updated">
            {{ value.new ? 'New' : 'Updated' }}
        </div>
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
    transition:
        background 0.2s,
        color 0.2s;
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

    .newBadge {
        background: var(--vp-c-brand-1);
        color: var(--vp-c-bg);
        border-radius: 100px;
        padding: 2px 6px;
        text-align: center;
        font-size: 12px;
        line-height: 1.4;
        font-weight: 500;
        margin-top: -5px;
    }
}
</style>
<style>
.IconListItem svg {
    color: var(--customize-color, inherit) !important;
    width: var(--customize-size, 24px) !important;
    height: var(--customize-size, 24px) !important;
}
</style>
