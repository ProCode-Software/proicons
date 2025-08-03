<script setup lang="ts">
import { computed } from 'vue'
import { copyChar, copyDataUri, copySvg } from '../../../composables/copyData'
import { Icon } from '../../../composables/types'

const { icon, mode } = defineProps<{ icon: [string, Icon]; mode: string }>()

const iconName = computed(() => icon[0])
const iconData = computed(() => icon[1])

const items = {
    copy: [
        {
            text: 'Copy SVG',
            action: () => copySvg(iconData),
        },
        {
            text: 'Copy Data URL',
            action: () => copyDataUri(iconData),
        },
        {
            text: 'Copy Glyph',
            action: () => copyChar(iconName),
        },
    ],
    download: [
        {
            text: 'Download SVG',
            action: '',
        },
        {
            text: 'Download PNG',
            action: '',
        },
    ],
}
const flyoutItems = computed(() => items[mode])
</script>
<template>
    <div class="flyout flyout-group flyout-context-menu">
        <a class="contextItem" v-for="item in flyoutItems" @click="item.action()">{{
            item.text
        }}</a>
    </div>
</template>
<style lang="scss" scoped></style>
