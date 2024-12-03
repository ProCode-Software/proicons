import { reactive } from "vue";

const customizations = {
    size: 24,
    strokeWidth: 1.5,
    color: 'currentColor',
    cornerRadius: -0.5,
    strokeFilledElements: false,
}

export const customizationData = reactive(structuredClone(customizations))

export function resetToDefaults() {
    for (const key in customizations) {
        customizationData[key] = customizations[key]
    }
}