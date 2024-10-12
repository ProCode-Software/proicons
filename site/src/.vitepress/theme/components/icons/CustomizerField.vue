<script setup lang="ts">
import { ref, inject } from 'vue'
import VPSwitch from "vitepress/dist/client/theme-default/components/VPSwitch.vue";

interface Props {
    type: 'color' | 'slider' | 'toggle';
    label: string;
    min?: number;
    max?: number;
    defaultValue: string | number | boolean;
    bind?: string;
    className?: string;
    step?: number;
}
const { type, label, min, max, defaultValue, bind, className, step } = defineProps<Props>()

const isHorizontal: Record<Props['type'], boolean> = {
    color: true,
    slider: false,
    toggle: true
}

const value = ref(defaultValue)

const updateSliderValue = inject('update-slider-value', () => {
    value.value = !value.value
})
</script>

<template>
    <div
        :class="`CustomizeIconField ${type}CustomizerField ${isHorizontal[type] ? 'horizontal' : ''} ${className ?? ''}`">
        <p class="customizeLabel">
            {{ label }}{{ type == 'slider' ? ":" : '' }}
            <span class="value" v-if="type == 'slider'">{{
                value }}</span>
        </p>

        <input type="range" v-if="type == 'slider'"
            :min="min" :value="defaultValue" :max="max"
            :step="step" :class="className ?? ''"
            v-model="value">

        <VPSwitch :class="className ?? ''"
            @click="updateSliderValue"
            v-if="type == 'toggle'" v-model="value">

        </VPSwitch>
    </div>
</template>
<style scoped lang="scss">
.CustomizeIconField {
    font-size: inherit;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.sliderCustomizerField input {
    width: 100%;
}

.CustomizeIconField.horizontal {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.customizeLabel {
    font-weight: 500;
    font-size: 14px;

    span {
        color: var(--vp-c-text-3);
    }
}
</style>
<style lang="scss">
input[type="range"] {
    appearance: none;
    -webkit-appearance: none;
    background: var(--vp-c-default-soft);
    border-radius: 100px;
    height: 5px;
    margin-block: 6px;
}

::-webkit-slider-runnable-track {}

::-webkit-slider-thumb {
    background: #fff;
    box-shadow: var(--vp-shadow-2);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    appearance: none;
    -webkit-appearance: none;
}
</style>