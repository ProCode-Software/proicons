<script setup lang="ts">
const { query } = defineProps<{ query: string }>()
</script>
<template>
    <p>No results for "{{ query }}"</p>
</template>
<style lang="scss" scoped></style>