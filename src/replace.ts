// @ts-nocheck
import getIconInfo from './getIconInfo'
import { type ProIconReplaceConfig, ProIcon } from './types'

/**
 * Converts all elements with the `proicon` attribute (which can be customised in the config) on the page to an icon corresponding to the attribute value.
 * Note that this only works in a browser environment, and also breaks tree-shaking.
 * @param rootElm The element to search inside for children with the `proicon` attribute. Defaults to `document.body`.
 * @param config An optional configuration to customise the behaviour of the replace method
 *
 * [Documentation](https://procode-software.github.io/proicons/docs/javascript-api#replace)
 */
function replace(rootElm?: Element, config?: ProIconReplaceConfig): void {
    // TODO: fix
    if (!window?.document) {
        throw new Error('proicons.replace() only works in a browser environment')
    }

    // Default properties
    rootElm ??= document.body
    const useAttrs = config?.useAttributes ?? true
    const attr = config?.attributeName ?? 'proicon'

    for (const element of rootElm.querySelectorAll(`[${attr}]`) as Element[]) {
        let toReplace

        switch (config?.overwrite ?? 'auto') {
            case true:
                toReplace = true
                break
            case false:
                toReplace = false
                break
            case 'auto':
                toReplace = !element.hasChildNodes()
                break
        }

        let iconName = element.getAttribute(attr).trim()
        const iconInfo = getIconInfo(iconName)
        if (!iconInfo) {
            continue
        }

        let iconElement = document.createElement('svg')

        const propMap: Record<string, keyof ProIcon> = {
            color: 'color',
            'stroke-width': 'strokeWidth',
            join: 'strokeJoin',
            caps: 'strokeCaps',
            'corner-radius': 'cornerRadius',
            outline: 'strokeFilledElements',
            size: 'size',
        }
        const elementConfig: ProIconReplaceConfig = {}

        if (useAttrs) {
            for (const [htmlAttr, optionKey] of Object.entries(propMap)) {
                if (element.hasAttribute(htmlAttr)) {
                    elementConfig[optionKey] = element.getAttribute(htmlAttr)
                    element.removeAttribute(htmlAttr)
                }
            }
            for (const { name, value } of element.attributes) {
                if (!Object.hasOwn(propMap, name)) {
                    elementConfig.attributes ??= {}
                    elementConfig.attributes[name] = value
                }
            }
            Object.assign(structuredClone(config ?? {}), elementConfig)
        }

        iconElement.innerHTML = getIconInfo(iconName).toSvg(elementConfig)
        iconElement = iconElement.children[0]

        iconElement.classList.add('proicon')
        iconElement.setAttribute('data-proicon-id', getIconInfo(iconName).kebabCase)

        toReplace == true
            ? element.replaceWith(iconElement)
            : element.insertBefore(iconElement, element.childNodes[0])
    }
}

export default replace
