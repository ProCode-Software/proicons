import { reactive } from "vue";

const customizations = {
    size: 24,
    strokeWidth: 1.5,
    color: 'currentColor',
    cornerRadius: -0.5,
    strokeFilledElements: false,
}

export const customizationData = reactive(structuredClone(customizations))

type CustomizationData = typeof customizationData

export function resetToDefaults() {
    for (const key in customizations) {
        customizationData[key] = customizations[key]
    }
}

export function useSvgVariables(svg: string, customizations: CustomizationData): string {
    let newString = svg
    const STROKE_WIDTH_REGEX = /stroke-width="(.*?)"/g
    const CORNER_RADIUS_REGEX = /rx="(.*?)"/g

    function replaceRegex(regex: RegExp, varName: string) {
        newString = newString.replace(regex, (m, g1) => {
            return m.replace(g1, `var(--customize-${varName}, ${g1})`)
        })
    }
    
    // Replace stroke-width with variable
    replaceRegex(STROKE_WIDTH_REGEX, 'stroke-width')

    // Replace corner radius (must be done manually)
    if (+customizations.cornerRadius >= 0) {
        newString = newString.replace(CORNER_RADIUS_REGEX, (m, g1) => {
            // @ts-ignore
            return m.replace(g1, customizations.cornerRadius)
        })
    }

    // TODO: Outline strokes

    return newString
}