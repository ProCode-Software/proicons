<script setup lang="ts">
const { placeholder } = defineProps<{ placeholder: string }>()
</script>
<template>
    <div class="IconSearchBar">
        <span class="VPIcon vpi-search"></span>
        <input type="search" class="iconSearchInput"
            :placeholder="placeholder">
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
}

.VPIcon {
    width: 24px;
    height: 24px;
}
</style>