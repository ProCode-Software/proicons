<script setup lang="ts">
import { Ref, ref, watch } from 'vue'

interface Item {
    text: string
    action?: () => void
    header?: boolean
    default?: boolean
    index?: number
}
interface Props {
    items: Item[]
    open: Ref<boolean, boolean> | boolean
    mainRef?: Ref
    position: ['top' | 'center' | 'bottom', 'left' | 'middle' | 'right']
    selectMenu?: boolean
}
const { items, open, selectMenu } = defineProps<Props>()
const main = ref<HTMLDivElement | null>(null)
const emit = defineEmits(['update:open', 'change'])
const currentItem = ref(-1)

let suppress = false

function closeOnClickOutside(e: Event) {
    if (suppress) {
        suppress = false
        return
    }
    if (main.value && !main.value.contains(e.target as Node)) {
        emit('update:open', false)
    }
}
function toggleOpen() {
    suppress = true
    emit('update:open', !open)
}

function changeItem(index: number) {
    if (selectMenu) {
        currentItem.value = index
        emit('change', currentItem.value)
    }
}

watch(
    () => open,
    value => {
        if (value) {
            document.addEventListener('click', closeOnClickOutside)
            return
        }
        document.removeEventListener('click', closeOnClickOutside)
    }
)
const itemIndex = items.map((item, index) => {
    item.index = index
    return item
})

const headerItems = itemIndex.filter(item => item.header)
const nonHeaderItems = itemIndex.filter(item => !item.header)

if (selectMenu) {
    currentItem.value = itemIndex.findIndex(item => item.default)
}

function itemClick(item: Item) {
    item.action?.()
    changeItem(item.index)
    toggleOpen()
}
</script>
<template>
    <slot name="trigger" :toggle="toggleOpen" />
    <Transition name="flyout">
        <div :class="['flyout', ...position]" v-if="open" ref="main">
            <div class="header" v-if="headerItems.length">
                <button
                    :class="{
                        contextItem: true,
                        active: currentItem === item.index,
                    }"
                    v-for="item in headerItems"
                    @click="itemClick(item)"
                    v-html="item.text"
                />
            </div>
            <div class="items">
                <button
                    :class="{
                        contextItem: true,
                        active: currentItem === item.index,
                    }"
                    v-for="item in nonHeaderItems"
                    @click="itemClick(item)"
                    v-html="item.text"
                />
            </div>
        </div>
    </Transition>
</template>
<style lang="scss" scoped>
.flyout {
    --transform: translateY(-10px);
    position: absolute;
    border: 1px solid var(--vp-c-divider);
    border-radius: 15px;
    background-color: var(--vp-c-bg-elv);
    max-height: 60vh;
    overflow: hidden auto;
    box-shadow: var(--vp-shadow-3);
    padding: 10px;
    flex-direction: column;
    z-index: 10;
    display: flex;
    flex-direction: column;

    &.flyout-enter-active,
    &.flyout-leave-active {
        transition: all 0.2s cubic-bezier(0.01, 0.37, 0.54, 1.01);
    }

    &.flyout-leave-active {
        transition-duration: 0.15s;
    }

    &.flyout-enter-from,
    &.flyout-leave-to {
        opacity: 0;
        transform: var(--transform);
    }

    .items,
    .header {
        display: flex;
        flex-direction: column;
        gap: 4px;
        width: 100%;

        &.header {
            border-bottom: 1px solid var(--vp-c-divider);
            padding-bottom: 5px;
        }
    }

    .header + .items {
        padding-top: 5px;
    }
}

.flyout {
    &.bottom {
        top: calc(100% + 10px);
    }
    &.top {
        --transform: translateY(10px);
        bottom: calc(100% + 10px);
    }

    &.right {
        right: 0;
    }

    &.center.right {
        --transform: translateX(10px) translateY(-50%);
    }

    &.center {
        top: 50%;
        transform: translateY(-50%);
    }
}

.contextItem {
    line-height: normal;
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
    border-radius: 6px;
    padding: 0 12px;
    line-height: 32px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-1);
    white-space: nowrap;
    transition:
        background-color 0.25s,
        color 0.25s;
    text-align: left;

    &:hover {
        color: var(--vp-c-brand-1);
        background-color: var(--vp-c-default-soft);
    }

    &.active {
        color: var(--vp-c-brand-1);
    }
}
</style>
