<script setup lang="ts">
const { icon } = defineProps<{ icon }>()

const [key, value] = icon

const svg = value.icon
</script>

<template>
    <div class="IconListItem">
        <component is="div" v-html="svg" />
        <span class="iconLabel">{{ key }}</span>
    </div>
</template>