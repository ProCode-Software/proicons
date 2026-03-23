<script setup lang="ts">
import { ref } from 'vue'
import ProIcon from '../src/ProIcon.vue'
import { AddSquareMultipleIcon, AddIcon, TvIcon, BrainIcon } from '../src/icons'

const size = ref(48)

const randomIcons = ['Photo', 'Search', 'Cheese', 'Toast', 'Save']
const getRandomIcon = () => randomIcons[Math.floor(Math.random() * randomIcons.length)]
const iconName = ref(getRandomIcon())
</script>

<template>
    <h1>ProIcons Vue Test</h1>
    <AddSquareMultipleIcon :size="32" color="red" />

    <!-- Test for https://github.com/ProCode-Software/proicons/issues/5 -->
    <div style="color: green">
        <AddIcon color="red" />
        <!-- red ✓ -->
        <TvIcon />
        <!-- green ✓ -->
    </div>
    <div style="color: blue">
        <AddIcon />
        <!-- red x -->
        <TvIcon />
        <!-- blue ✓ -->
    </div>
    <ProIcon icon="Search Cancel" :size="48" />

    <h2>Dynamic icons</h2>
    Size: <input type="range" v-model.number="size" min="24" max="72" />
    <br />
    <ProIcon icon="Search Cancel" :size />
    <BrainIcon :size />
    <br>
    <ProIcon :icon="iconName" :size />
    <button @click="() => iconName = getRandomIcon()">Random Icon</button>
</template>
