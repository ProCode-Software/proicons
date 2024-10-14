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
    suffix?: string;
    tooltip?: string;
}
const { type, label, min, max, defaultValue, bind, className, step, suffix, tooltip } = defineProps<Props>()

const isHorizontal: Record<Props['type'], boolean> = {
    color: false,
    slider: false,
    toggle: true
}

const value = ref(defaultValue)

const updateSwitchValue = inject('update-slider-value', (e) => {
    value.value = !value.value
})
</script>

<template>
    <div :class="[
        'CustomizeIconField',
        type + 'CustomizerField',
        isHorizontal[type] ? 'horizontal' : '',
        className
    ]">
        <p class="customizeLabel">
            {{ label }}{{ type == 'slider' ? ":" : '' }}
            <span class="value" v-if="type == 'slider'">{{
                value }}{{ suffix ?? '' }}</span>

            <span v-if="tooltip" :title="tooltip"
                class="VPIcon vpi-info"></span>
        </p>

        <input type="range" v-if="type == 'slider'"
            :min="min" :max="max" :step="step"
            :class="className" v-model="value"
            :style="`--p: ${(value - (min ?? 0)) / (max - (min ?? 0)) * 100}%`">

        <VPSwitch :class="className"
            @click="updateSwitchValue"
            v-if="type == 'toggle'" v-model="value" />

        <div :class="['colorPicker', className]"
            v-if="type === 'color'">
            <input type="text" class="colorInput"
                v-model="value">
            <div class="colorPreview">
                <input type="color" v-model="value">
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.CustomizeIconField {
    font-size: inherit;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
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
    display: flex;
    align-items: center;
    gap: 8px;

    span {
        color: var(--vp-c-text-3);

        &.VPIcon {
            cursor: pointer;
        }
    }
}

.VPSwitch[modelvalue="true"] {
    background-color: var(--vp-c-brand-1);
}

.VPIcon.vpi-info {
    width: 20px;
    height: 20px;
    display: inline-flex;
    --icon: url("https://raw.githubusercontent.com/ProCode-Software/proicons/main/icons/svg/info.svg");
}

.colorPicker {
    display: flex;
    align-items: center;
    background: var(--vp-c-bg);
    border-radius: 10px;
    padding: 6px;
    gap: 10px;
    transition: box-shadow .2s;
    cursor: text;

    &:hover {
        --shadow-color: var(--vp-c-gray-3);
    }

    &:hover,
    &:focus-within {
        box-shadow: inset 0 0 0 1.5px var(--shadow-color);
    }

    &:focus-within {
        --shadow-color: var(--vp-c-brand-1);
    }

    .colorInput {
        padding-left: 6px;
        border: none;
        outline: none;
        font-family: inherit;
        background: none;
        font-size: inherit;
        width: 100%;
    }

    .colorPreview {
        width: 26px;
        height: 26px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        flex: none;

        input {
            padding: 0;
            border: 0;
            outline: none;
            width: 36px;
            height: 36px;
            flex: none;
        }
    }
}
</style>
<style lang="scss">
input[type="range"] {
    --bar: var(--vp-c-default-soft);
    --active: var(--vp-c-brand-1);
    appearance: none;
    -webkit-appearance: none;
    background: linear-gradient(90deg, var(--active) var(--p), var(--bar) var(--p));
    border-radius: 100px;
    height: 5px;
    margin-block: 6px;

    &:focus-visible {
        box-shadow: 0 0 0 2px currentColor
    }
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

.CustomizeIconField .VPSwitch[modelvalue="true"] .check {
    transform: translateX(100%);
}

.CustomizeIconField .VPSwitch .check {
    background: #fff;
}
</style>