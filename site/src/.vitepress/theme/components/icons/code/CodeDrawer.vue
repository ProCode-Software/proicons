<script setup lang="ts">
import { computed } from 'vue'
import CodeGroup from './CodeGroup.vue'
import { getCodeExamples } from '../../../composables/useCodeExamples'
import { customizationData } from '../../../composables/useCustomizations'

const { visible, icon } = defineProps<{ visible: boolean; icon: string }>()

interface CodeExample {
    code: string
    entry: string
    language: string
}
function mapCodeExamples(code: Record<string, CodeExample>) {
    return Object.entries(code).map(([label, data]) => {
        return { label, ...data }
    })
}
const items = computed(() => mapCodeExamples(getCodeExamples(icon, customizationData)))
</script>
<template>
    <Transition name="drawer">
        <div class="CodeDrawer vp-doc" v-show="visible">
            <Suspense>
                <CodeGroup :items="items" />
            </Suspense>
        </div>
    </Transition>
</template>
<style scoped lang="scss">
.CodeDrawer {
    width: 100%;
    border-top: 1px solid var(--vp-c-divider);
    grid-area: e;
    padding: 0;
    border-radius: 0 0 20px 20px;
    clip-path: border-box;
    --vp-code-block-bg: var(--vp-c-bg);
    --vp-code-tab-bg: var(--vp-code-block-bg);
    transition: all 0.3s cubic-bezier(0.41, 0.04, 0.28, 0.98);

    &.drawer-enter-active,
    &.drawer-leave-active {
        transform-origin: bottom;
        overflow: hidden;
    }

    &.drawer-enter-from,
    &.drawer-leave-to {
        opacity: 0;
        max-height: 0;
    }

    &.drawer-enter-to,
    &.drawer-leave-from {
        opacity: 1;
        max-height: 300px;
    }
}
</style>
<style lang="scss">
.CodeDrawer div {
    margin: 0 !important;
    border-radius: 0 !important;
}
</style>
