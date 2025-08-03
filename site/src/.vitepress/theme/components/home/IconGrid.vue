<script setup lang="ts">
import { fetchVersion } from '../../composables/versionData'
import { ref } from 'vue'
import { onMounted } from 'vue'
const { icons } = await fetchVersion('development')

const amount = 60,
    timeout = 4

const randomIcons = ref<typeof iconEntries>([])
const iconEntries = Object.entries(icons)

function setRandomIcons() {
    randomIcons.value = iconEntries.sort(() => Math.random() - 0.5).slice(0, amount)
}

setRandomIcons()
onMounted(() => {
    setInterval(setRandomIcons, 1000 * timeout)
})
</script>
<template>
    <div class="IconGrid">
        <div
            v-for="[name, { icon }] in randomIcons"
            :key="name"
            class="IconItem"
            v-html="icon"
        ></div>
    </div>
</template>
<style scoped lang="scss">
.IconGrid {
    $cell-size: 64px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax($cell-size, 1fr));
    grid-template-rows: repeat(auto-fill, minmax($cell-size, 1fr));
    gap: 1px;
    margin: 0 auto;
    width: 100%;
    overflow: hidden;
    min-width: 300px;
    max-height: calc(($cell-size * 5) + 4px);
    background: var(--vp-c-divider);
    border-radius: 20px;
    box-shadow: var(--vp-shadow-3);
    z-index: 3;
    transition: transform 0.15s ease-out;

    .IconItem {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        background: var(--vp-c-bg);
    }
}
</style>
<style lang="scss">
.IconGrid .IconItem > svg {
    animation: svg_show 0.3s ease-out;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.1);
    }
}

@keyframes svg_show {
    from {
        transform: scale(0.5);
        opacity: 0;
        filter: blur(4px);
    }

    to {
        transform: scale(1);
        opacity: 1;
        filter: blur(0);
    }
}
</style>
