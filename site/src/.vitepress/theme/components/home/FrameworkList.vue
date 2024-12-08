<script setup lang="ts">
import { withBase } from "vitepress";

const frameworks = [
    { name: 'HTML', icon: 'html5.svg', path: 'html-api' },
    { name: 'JavaScript', icon: 'javascript.svg', path: 'javascript-api' },
    { name: 'React', icon: 'react.svg', path: 'react' },
    { name: 'Roblox', icon: 'roblox-studio.svg', path: 'roblox' },
    { name: 'Vue', icon: 'vue.svg', path: 'vue' },
]
</script>
<template>
    <div class="FrameworkList" align="center">
        <h2 class="title">Available for</h2>
        <div class="frameworks">
            <a v-for="framework in frameworks"
                class="framework"
                :href="`./docs/${framework.path}`"
                :title="framework.name">
                <img :src="withBase(`/logos/${framework.icon}`)" />
            </a>
        </div>
    </div>
</template>
<style scoped lang="scss">
.frameworks {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    .framework {
        img {
            width: 48px;
            height: 48px;
            display: flex;
            transition: .15s;

            &:hover {
                transform: scale(1.1);
            }
        }
    }
}
</style>