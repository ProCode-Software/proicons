// @ts-nocheck
import getIconInfo from './getIconInfo'
import { ProIconReplaceConfig, ProIconInfo } from './interfaces';
import { icons } from './proicons';

/**
 * Converts all elements with the `proicon` attribute (which can be customised in the config) on the page to an icon corresponding to the attribute value.
 * Note that this only works in a browser environment. This also breaks tree-shaking.
 * @param rootElm The element to search inside for children with the `proicon` attribute. Defaults to `document.body`.
 * @param config An optional configuration to customise the behaviour of the replace method
 */
function replace(rootElm?: Element, config?: ProIconReplaceConfig): void {
    // TODO: fix
    if (!window?.document) {
        throw new Error("proicons.replace() only works in a browser environment")
    }
    
    // Default properties
    rootElm ??= document.body;
    const useAttrs = config?.useAttributes ?? true
    const attr = config?.attributeName ?? 'proicon';


    for (const element of rootElm.querySelectorAll(`[${attr}]`)) {
        let toReplace

        switch (config?.overwrite ?? 'auto') {
            case true: toReplace = true; break;
            case false: toReplace = false; break;
            case 'auto': toReplace = !element.hasChildNodes(); break;
            default: toReplace = !element.hasChildNodes(); break;
        }

        let iconName = element.getAttribute(attr).trim()
        const iconInfo = getIconInfo(iconName)
        if (!iconInfo) continue

        let iconElement = document.createElement('svg')

        //

        icon.innerHTML = getIconInfo(iconName).toSvg(config)
        icon = icon.children[0]
    }
    rootElm.querySelectorAll(`[${attr}]`).forEach((element) => {

        let toReplace;
        switch (config?.overwrite) {
            
        }

        let iconName = element.getAttribute(attr).trim()

        const iconInfo = getIconInfo(iconName)

        if (!iconInfo) continue


        let icon: SVGElement = document.createElement('svg')
        icon.innerHTML = getIconInfo(iconName).toSvg(config)
        icon = icon.children[0]

        const attributeList: Record<string, [keyof ProIconReplaceConfig, (keyof SVGElement | undefined)[]]> = {
            // HtmlAttribute, configKey, svgAttr
            "color": ["color", ["stroke", 'fill']],
            "stroke-width": ["strokeWidth", ["stroke-width"]],
            "join": ["strokeCaps", ["stroke-linejoin"]],
            "caps": ["strokeJoin", ["stroke-linecap"]],
            "corner-radius": ["cornerRadius", ["rx"]],
            "outline": ["strokeFilledElements", undefined]
        }
        if (config) {
            Object.values(attributeList)
                .map((v) => v[0])
                .forEach((c, i) => {
                    const htmlAttr = Object.keys(attributeList)[i];
                    let valueToUse

                    if (useAttrs && element.hasAttribute(htmlAttr)) {
                        valueToUse = element.getAttribute(htmlAttr)
                    } else if (config[c]) {
                        valueToUse = config[c]
                    }

                    if (valueToUse) {
                        element.setAttribute(htmlAttr, valueToUse);
                    }
                });
        }
        for (const attr of element.attributes) {
            const name = attr.name.toLowerCase()
            const value = attr.value

            if (Object.hasOwn(attributeList, name)) {
                if (name != 'outline') {
                    if (value) {
                        const n = attributeList[name][1]
                        n.forEach(x => {
                            icon.querySelectorAll(`[${x}]`).forEach(b => {
                                b.setAttribute(x, value)
                            })
                        })
                    }
                } else {
                    // Behaviour for outlining
                    const defaultStrokeWidth = 1.5
                    const unstrokedElms = Array.from(icon.querySelectorAll('*')).filter(f => !f.hasAttribute('stroke'))

                    unstrokedElms.forEach(elm => {
                        const reducedStroke = +element.getAttribute('stroke-width') - defaultStrokeWidth
                        if (reducedStroke > 0) {
                            elm.setAttribute('stroke', element.getAttribute('color') ?? 'currentColor')
                            elm.setAttribute('stroke-width', reducedStroke)
                            elm.setAttribute('stroke-linejoin', element.getAttribute('strokeJoin') ?? 'round')
                            elm.setAttribute('stroke-linecap', element.getAttribute('strokeCaps') ?? 'round')
                        }
                    })
                }
            } else {
                icon.setAttribute(name, value)
            }
        }
        if (config?.attributes) {
            for (const [k, v] of Object.entries(config.attributes)) {
                icon.setAttribute(k, v)
            }
        }

        icon.classList.add('proicon')
        icon.setAttribute('data-proicon-id', getIconInfo(iconName).kebabCase)

        toReplace == true ? element.replaceWith(icon)
            : element.insertBefore(icon, element.childNodes[0])
    });
}

export default replace
