<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'
const { placeholder } = defineProps<{ placeholder: string }>()

const emit = defineEmits(['update:modelValue'])
const searchQuery = ref('')

watch(searchQuery, (newValue) => {
    emit('update:modelValue', newValue)
})
</script>
<template>
    <div class="IconSearchBar">
        <span class="VPIcon vpi-search"></span>
        <input type="search" class="iconSearchInput"
            :placeholder="placeholder" v-model="searchQuery">
        <kbd>/</kbd>
    </div>
</template>
<style lang="scss" scoped>
.IconSearchBar {
    display: flex;
    align-items: center;
    padding: 10px 14px;
    background: var(--vp-c-bg-alt);
    border-radius: 10px;
    gap: 10px;
    font-size: 14px;
    transition: box-shadow .2s;
    position: sticky;
    font-weight: 500;

    &:hover {
        box-shadow: inset 0 0 0 1.5px var(--vp-c-gray-3);
    }

    &:focus-within {
        box-shadow: inset 0 0 0 1.5px var(--vp-c-brand-1);
    }

    input {
        font: inherit;
        width: 100%;
        border: none;
        outline: none;
        background: none;

    }

    kbd{
        padding: 0px 8px;
        color: var(--vp-c-text-2);
        border-radius: 6px;
        font-weight: 500;
        font-size: 12px;
        border: 1px solid var(--vp-c-divider);
    }
}

.VPIcon {
    width: 24px;
    height: 24px;
}
</style>