<script setup lang="ts">
import { kebabCase } from "../../composables/rename";

interface Icon {
    category: string,
    description: string,
    icon: string
}

const { icon } = defineProps<{ icon?: [string, Icon] }>()

</script>
<template>
    <aside class="IconDetail" v-if="icon">
        <div class="iconPreviewGrid" v-html="icon[1].icon"></div>
        <div class="iconDetail">
            <h2 class="icon">{{ icon[0] }}</h2>
        </div>
    </aside>
</template>
<style lang="scss" scoped>
.IconDetail {
    width: 300px;
    background: var(--vp-c-bg-alt);
}
.iconPreviewGrid {
    --grid-gradient: var(--vp-c-divider),
        var(--vp-c-divider) 1px,
        transparent 1px,
        transparent 12.5px;
    width: 100%;
    aspect-ratio: 1/1;
    background: repeating-linear-gradient(90deg, var(--grid-gradient)), repeating-linear-gradient(0deg, var(--grid-gradient));
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
<style lang="scss">
.iconPreviewGrid svg {
    width: 100px;
    height: 100px;
    display: flex;
    z-index: 10;
}
</style>