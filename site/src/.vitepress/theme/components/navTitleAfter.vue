<script setup lang="ts">
import { data } from './fetchVersion.data'

</script>

<template>
    <a href="https://github.com/ProCode-Software/proicons">
        <span class="titleAfter">v{{ data.version }}</span>
    </a>
</template>