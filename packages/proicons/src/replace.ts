import { getIconInfo } from './getIconInfo'
import { type ProIconReplaceConfig } from './types'

/**
 * Converts all elements with the `proicon` attribute (which can be customised in the config) on the page to an icon corresponding to the attribute value.
 * Note that this only works in a browser environment, and also breaks tree-shaking.
 * @param rootElm The element to search inside for children with the `proicon` attribute. Defaults to `document.body`.
 * @param config An optional configuration to customise the behaviour of the replace method
 *
 * [Documentation](https://procode-software.github.io/proicons/docs/javascript-api#replace)
 */
export function replace(rootElm?: Element, config?: ProIconReplaceConfig): void {
    if (!window?.document)
        throw new Error('proicons.replace() only works in a browser environment')

    // Default properties
    rootElm ??= document.body
    const useAttrs = config?.useAttributes ?? true
    const attr = config?.attributeName ?? 'proicon'
    const replaceChildren = config?.overwrite ?? 'auto'

    for (const element of rootElm.querySelectorAll(`[${attr}]`)) {
        let iconName = element.getAttribute(attr)!.trim()
        const iconInfo = getIconInfo(iconName)
        // Icon doesn't exist
        if (!iconInfo) {
            console.error(`Icon '${iconName}' not found`)
            continue
        }

        // New svg element
        let newElement: Element = document.createElement('svg')

        // Create element config
        const elementConfig = useAttrs ? applyConfigAttributes(element, config) : config
        // Render nodes
        newElement.innerHTML = iconInfo.toSvg(elementConfig)
        newElement = newElement.firstElementChild!

        // ProIcon attributes
        newElement.classList.add('proicon')
        newElement.setAttribute('data-proicon-id', iconInfo.kebabCase)

        // Replace the old element
        if (replaceChildren == 'auto' ? !element.hasChildNodes() : replaceChildren)
            element.replaceWith(newElement)
        else element.insertBefore(newElement, element.firstChild)
    }
}

function applyConfigAttributes(
    element: Element,
    defaultConfig?: ProIconReplaceConfig
): ProIconReplaceConfig {
    // Returns an attribute, otherwise the default config's value or undefined
    function getAttr<T = string>(
        attr: string,
        defaultKey: keyof ProIconReplaceConfig
    ): string | T | undefined {
        const value = element.getAttribute(attr)
        element.removeAttribute(attr)
        return ((value ?? defaultConfig?.[defaultKey]) as T) ?? undefined
    }
    // Coerce to a number
    function numberAttr(attr: string, defaultKey: keyof ProIconReplaceConfig) {
        const value = getAttr<number>(attr, defaultKey)
        return value ? +value : undefined
    }

    // Config for each element
    const elementConfig: ProIconReplaceConfig = {
        ...defaultConfig,
        color: getAttr('color', 'color'),
        strokeWidth: numberAttr('stroke-width', 'strokeWidth'),
        cornerRadius: numberAttr('corner-radius', 'cornerRadius'),
        size: numberAttr('size', 'size'),
        // We don't care if these values are invalid
        strokeJoin: getAttr('join', 'strokeJoin') as ProIconReplaceConfig['strokeJoin'],
        strokeCaps: getAttr('caps', 'strokeCaps') as ProIconReplaceConfig['strokeCaps'],
    }
    // strokeFilledElements
    const outline = getAttr<boolean>('outline', 'strokeFilledElements')

    elementConfig.strokeFilledElements =
        outline === true ||
        outline == 'true' ||
        outline == '' ||
        //@ts-ignore
        outline?.toLowerCase?.() == 'outline'

    // Element attributes (customization attrs already removed)
    for (const { name, value } of element.attributes)
        (elementConfig.attributes ??= {})[name] = value

    return elementConfig
}
