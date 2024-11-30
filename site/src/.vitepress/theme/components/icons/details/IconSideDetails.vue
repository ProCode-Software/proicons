<script setup lang="ts">
import { computed } from "vue";
import { Codepoints, Lockfile } from "../../../composables/types";
import { getHex } from '../../../composables/useGlyphData';

const { icon, lockfile, codepoints } = defineProps<{
    icon: string,
    lockfile: Lockfile,
    codepoints: Codepoints
}>()

function getIconData() {
    return computed(() => lockfile.icons.find((i) => i.name == icon)).value
}

const data = computed(() => [
    {
        key: `Added`,
        value: 'v' + getIconData().added,
        href: `https://github.com/ProCode-Software/proicons/releases/tag/${getIconData().added}`
    },
    {
        key: 'Updated',
        if: 'updated' in getIconData(),
        value: 'v' + getIconData().updated
    },
    {
        key: 'Unicode Hex',
        value: 'U+' + getHex(icon, codepoints)
    },
])

const filtered = computed(() => data.value.filter(d => d.if ?? true))
</script>
<template>
    <div class="detail" v-for="item in filtered">
        <div class="key">{{ item.key }}</div>
        <component :is="item.href ? 'a' : 'div'"
            class="value"
            :href="item.value != 'v4.8.0' ? item.href : undefined">
            {{ item.value }}
        </component>
    </div>
</template>
<style lang="scss" scoped>
.detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    .key {
        color: var(--vp-c-text-2);
    }
    .value {
        color: var(--vp-c-text-1);
        font-weight: 500;
        border-radius: 10px;
        font-size: 15px;
    }
}
</style>