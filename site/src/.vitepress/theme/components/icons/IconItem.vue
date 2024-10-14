<script setup lang="ts">
const { icon } = defineProps<{ icon }>()

const [key, value] = icon

const svg = value.icon
</script>

<template>
    <div class="IconListItem">
        <button v-html="svg" tabindex="0" role="button"
            @click="$emit('selectIcon', icon)" />
        <span class="iconLabel">{{ key }}</span>
    </div>
</template>
<style scoped lang="scss">
.IconListItem {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    text-align: center;
    justify-content: center;
    font-size: 14px;

    &>button {
        aspect-ratio: 1 / 1;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        border: 1px solid var(--vp-c-gray-3);
        transition: background .2s;
        cursor: pointer;
    }

    &:hover>button {
        background: var(--vp-c-bg-alt);
    }

    .iconLabel {
        line-height: 140%;
        font-size: 13px;
        color: var(--vp-c-text-2);
    }
}
</style>