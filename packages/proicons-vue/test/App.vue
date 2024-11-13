<script setup lang="ts">
import ProIcon from '../src/ProIcon.vue'
import { AddSquareMultipleIcon } from "../src/icons";
</script>

<template>
    <AddSquareMultipleIcon :size="32" color="red" />
    <ProIcon icon="ProIcons Vue" :size="50" />
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
