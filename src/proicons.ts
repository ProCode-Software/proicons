// @ts-nocheck
import icons from './configs/icons.json';
import tags from './configs/tags.json';
import categories from './categories'
const rename = require('../bin/rename');
class ProIconInfo {
    /**
     * 
     * @param name The name of the icon in Friendly Format
     * @param kebabCase The name of the icon in kebab-case
     * @param camelCase The name of the icon in camelCase
     * @param element The icon as an `SVGElement`. You can use the `outerHTML` property on this to return the icon as a string.
     * @param category The category of the icon.
     * @param tags An array of tags for the icon
     */
    constructor(
        name: string,
        kebabCase: string,
        camelCase: string,
        element: SVGElement,
        tags: string[],
        category: string
    ) {
        this.name = name;
        this.kebabCase = kebabCase;
        this.camelCase = camelCase;
        this.element = element;
        this.category = category;
        this.tags = tags;
    }
}

/**
 *
 * @param key The icon name in Friendly Format, camelCase or kebab-case. Throws an error if the provided key is invalid. Case-insensitive
 * @example getIconInfo('Add Square')
 * getIconInfo('addSquare')
 * getIconInfo('add-square')
 */
function getIconInfo(key: string) {
    // Camel case
    let prop: string;

    const isFriendly = (t: string) => t.toLowerCase() == key.toLowerCase();
    const isKebab = (t: string) => rename.kebabCase(t.toLowerCase()) == rename.kebabCase(key.toLowerCase());
    const isCamel = isFriendly

    if (Object.keys(tags).some(isFriendly)) {
        prop = rename.camelCase(Object.keys(tags).find(isFriendly));

    } else if (Object.keys(tags).some(isKebab)) {
        prop = rename.camelCase(Object.keys(tags).find(isKebab));

    } else if (Object.keys(icons).some(isCamel)) {
        // @ts-ignore
        prop = Object.keys(icons).find(isCamel);

    } else {
        throw new Error(`Invalid icon key ${getIconInfo}: Icon not found`);
    }

    const friendlyName = Object.keys(tags).find((t) => {
        return rename.camelCase(t) == prop;
    });

    const domParser = new DOMParser();
    const parsed = domParser.parseFromString(icons[prop], 'image/svg+xml');

    const info = new ProIconInfo(
        friendlyName, //name
        rename.kebabCase(friendlyName), //kebab
        prop, //camel
        parsed.querySelector('svg'), //svg
        tags[friendlyName].description.split(',').map(m => m.trim()), //desc
        tags[friendlyName].category, //tags
    );
    return info;
}


interface ProIconReplaceConfig {
    /** Determines the color of the icons. Defaults to `currentColor`. */
    color: string,
    /** Determines the default stroke width of the icon. Defaults to `1.5`. This only works on SVG elements with existing strokes; add `strokeFilledElements` for this property to affect such elements. */
    strokeWidth: number,
    /** Apply strokes to filled SVG elements, such as circles, by the provided amount with `1.5` (default stroke value) subtracted, if `strokeWidth` is set to a value above `1.5`. Defaults to `false`
     * @example If `strokeWidth` is set to `2`, filled SVG elements will have an additional `0.5`px stroke
     */
    strokeFilledElements: boolean
    /** Defaults to `round` */
    strokeCaps: 'round' | 'square' | 'butt',
    /** Defaults to `round` */
    strokeJoin: 'round' | 'miter' | 'bevel',
    /** Determines the corner radius of SVG elements. Does not apply to all rounded elements. */
    cornerRadius: number,
    /** The attribute name that is checked for when converting elements to icons. Defaults to `proicon`. */
    attributeName: string,
    /** Determines whether to overwrite elements when converting to icons. Setting this to `auto` will overwrite only if the element does not have any children. Defaults to `auto`. */
    overwrite: boolean | 'auto',
    /** Determines whether to apply existing HTMl attributes such as styles to the converted SVGs. Defaults to `true` */
    useAttributes: false
}
function replace(rootElm?: Element, config?: ProIconReplaceConfig): void {
    if (!rootElm) rootElm = document.body;
    config?.useAttributes ??= true

    const attr = config?.attributeName || 'proicon';
    rootElm.querySelectorAll(`[${attr}]`).forEach((element) => {
        let toReplace;
        switch (config?.overwrite) {
            case true: toReplace = true; break;
            case false: toReplace = false; break;
            case 'auto': toReplace = !element.hasChildNodes(); break;
            default: toReplace = !element.hasChildNodes(); break;
        }

        let iconName = element.getAttribute(attr).trim()
        let icon: SVGElement = getIconInfo(iconName).element

        const attributeList = {
            // HtmlAttribute, configKey, svgAttr
            "color": ["fill", ["stroke", 'fill']],
            "stroke-width": ["strokeWidth", ["stroke-width"]],
            "stroke": ["color", ["fill", "stroke"]],
            "join": ["strokeCaps", ["stroke-linejoin"]],
            "caps": ["strokeJoin", ["stroke-linecap"]],
            "corner-radius": ["corner-radius", ["rx"]],
            "outline": ["strokeFilledElements", undefined]
        }
        if (config) {
            Object.values(attributeList).map(v => v[0]).forEach((c, i) => {
                const htmlAttr = Object.keys(attributeList)[i]

                if (config.useAttributes && element.hasAttribute(htmlAttr)) return

                element.setAttribute(htmlAttr, config[c])
            })
        }
        for (const attr of element.attributes) {
            const name = attr.name.toLowerCase()
            const value = attr.value

            if (Object.hasOwn(attributeList, name)) {
                if (name != 'outline') {
                    if (!value) continue
                    const n = attributeList[name][1]
                    n.forEach(x => {
                        icon.querySelectorAll(`[${x}]`).forEach(b => {
                            b.setAttribute(x, value)
                        })
                    })
                } else {

                }
            }
        }



        toReplace == true ? element.replaceWith(icon)
            : element.insertBefore(icon, element.childNodes[0])
    });
}

export default { icons, replace, getIconInfo, categories };
