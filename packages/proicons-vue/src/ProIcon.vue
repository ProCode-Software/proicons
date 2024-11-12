<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ icon: string }>()

const count = ref(0)
</script>

<template>
    <button type="button" @click="count++">{{ icon }} count is {{ count }}</button>
</template>