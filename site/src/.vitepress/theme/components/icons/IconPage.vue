<script setup lang="ts">
import { data } from '../../../data/fetchIcons.data'
import IconList from "./IconList.vue";

const { icons } = data
</script>
<template>
    <div class="IconPage">
        <IconList type="main" :icons="icons" />
    </div>
</template>
<style lang="sass" scoped>

</style>