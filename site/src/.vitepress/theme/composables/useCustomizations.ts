import { reactive } from "vue";

const customizations = {
    size: 24,
    strokeWidth: 1.5,
    color: 'currentColor',
    cornerRadius: -0.5,
    strokeFilledElements: false,
}
export { customizations as defaultCustomizations }

export interface CustomizationData {
    size: number | string,
    strokeWidth: number | string,
    color: string,
    cornerRadius: number | string,
    strokeFilledElements: boolean
}

export const customizationData = reactive(structuredClone(customizations))

export function resetToDefaults() {
    for (const key in customizations) {
        customizationData[key] = customizations[key]
    }
}

export function useSvgVariables(svg: string, customizations: CustomizationData): string {
    let newString = svg
    const STROKE_WIDTH_REGEX = /stroke-width="(.*?)"/g
    const CORNER_RADIUS_REGEX = /rx="(.*?)"/g
    const OUTLINE_REGEX = /<(\w+)(?:(?!stroke-width)[^>])*?>/g

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

    // Outline strokes
    if (customizations.strokeFilledElements && +customizationData.strokeWidth > 1.5) {
        newString = newString.replace(OUTLINE_REGEX, (match) => {
            if (!match.includes("stroke-width")) {
                return match.replace(/<(\w+)/, `<$1 stroke="currentColor" stroke-width="var(--customize-outline-stroke-width)" stroke-linecap="round" stroke-linejoin="round"`);
            }
            return match;
        })
    }

    return newString
}