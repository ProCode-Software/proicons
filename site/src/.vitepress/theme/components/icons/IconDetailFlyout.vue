<script setup lang="ts">
import { data as versionData } from '../fetchVersion.data'
import { data as lockfile } from '../../../data/fetchLockfile.data'
import { getHex } from '../../composables/useGlyphData'

const { icon } = defineProps<{ icon: string }>()

const getIconData = () => lockfile.icons.find((i) => i.name == icon)

const data = [
    {
        key: 'Added',
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
        value: 'U+' + getHex(icon)
    },
]

const filtered = data.filter(d => d.if ?? true)
</script>
<template>
    <div class="flyout flyout-group">
        <div class="detail" v-for="item in filtered">
            <div class="key">{{ item.key }}</div>
            <component :is="item.href ? 'a' : 'div'" class="value" :href="item.value != 'v4.8.0' ? item.href : undefined">{{ item.value }}</component>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.flyout {
    font-size: 14px;
    width: 200px;
    gap: 10px;
    padding: 15px !important;
    cursor: initial;

    .detail {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .key {
            color: var(--vp-c-text-2);
        }

        .value {
            background: var(--vp-c-bg-alt);
            color: var(--vp-c-text-1);
            font-weight: 500;
            border-radius: 10px;
            padding: 2px 8px;
            font-size: 15px;
        }
    }
}
</style>