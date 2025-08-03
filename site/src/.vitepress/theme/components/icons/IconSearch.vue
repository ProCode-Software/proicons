<script setup lang="ts">
import { ref, watch } from 'vue'
import { getParam, removeParam, setParam } from '../../composables/useUrl'
import { SearchIcon } from '@proicons/vue'
const { placeholder } = defineProps<{ placeholder: string }>()

const emit = defineEmits(['update:modelValue'])
const searchQuery = ref('')

watch(searchQuery, newValue => {
    if (newValue) {
        setParam('q', newValue)
    } else {
        removeParam('q')
    }

    emit('update:modelValue', newValue)
})

getParam('q') && (searchQuery.value = getParam('q'))
</script>
<template>
    <div class="IconSearchBar">
        <SearchIcon style="flex-shrink: 0" />
        <input
            type="search"
            class="iconSearchInput"
            :placeholder="placeholder"
            v-model="searchQuery"
        />
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
    transition: box-shadow 0.2s;
    position: sticky;
    font-weight: 500;
    width: 100%;

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
