<script setup lang="ts">
import ProIcon from '../src/ProIcon.vue'
import { AddSquareMultipleIcon, AddIcon, TvIcon } from "../src/icons";
</script>

<template>
    <AddSquareMultipleIcon :size="32" color="red" />
    
    <!-- Test for https://github.com/ProCode-Software/proicons/issues/5 -->
    <div style="color: green">
        <AddIcon color="red" /> <!-- red ✓ -->
        <TvIcon /> <!-- green ✓ -->
    </div>
    <div style="color: blue">
        <AddIcon /> <!-- red x -->
        <TvIcon /> <!-- blue ✓ -->
    </div>
    <ProIcon icon="Search Cancel" :size="48" />
</template>