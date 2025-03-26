<script setup lang="ts">
import { withBase } from "vitepress";

const frameworks = [
    { name: 'HTML', icon: 'html5.svg', path: 'html-api', color: '#e34f26' },
    {
        name: 'JavaScript',
        icon: 'javascript.svg',
        path: 'javascript-api',
        color: '#f0db4f',
    },
    { name: 'React', icon: 'react.svg', path: 'react', color: '#00D8FF' },
    { name: 'Svelte', icon: 'svelte.svg', path: 'svelte', color: '#FF3E00' },
    { name: 'Vue', icon: 'vue.svg', path: 'vue', color: '#41B883' },
]
</script>
<template>
    <div class="FrameworkList">
        <h2 class="title">Available for</h2>
        <div class="frameworks">
            <a v-for="framework in frameworks" class="framework"
                :href="`./docs/${framework.path}`" :title="framework.name"
                :style="{ '--framework-color': framework.color }">
                <img :src="withBase(`/logos/${framework.icon}`)" />
            </a>
        </div>
    </div>
</template>
<style scoped lang="scss">
.FrameworkList {
    text-align: center;
}
.frameworks {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    .framework img {
        width: 48px;
        height: 48px;
        display: flex;
        transition: .15s;

        &:hover {
            transform: scale(1.1);
            filter: drop-shadow(0 0 20px var(--framework-color));
        }
    }
}
</style>