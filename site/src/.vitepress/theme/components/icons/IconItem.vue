<script setup lang="ts">
interface Properties {
    color: string,
    strokeWidth: number,
    outline: boolean,
    cornerRadius: number
}
const { element, properties } = defineProps<{ element: string, properties: Properties }>()
</script>
<template>
    
</template>