<script setup lang="ts">
import { data } from '../../../data/fetchIcons.data'
import IconList from "./IconList.vue";
import IconSearch from "./IconSearch.vue";

const { icons } = data

</script>
<template>
    <div class="IconPage">
        <IconSearch :placeholder="`Search ${Object.entries(icons).length} icons`" />
        <IconList :icons="icons" />
    </div>
</template>
<style lang="scss" scoped>
    .IconPage {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
</style>