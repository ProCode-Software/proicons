export interface ProIconReplaceConfig {
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

export class ProIconInfo {
    name: string;
    kebabCase: string;
    camelCase: string;
    element: SVGSVGElement;
    category: string;
    tags: string[];
    /**
     * 
     * @param name The name of the icon in Friendly Form
     * @param kebabCase The name of the icon in kebab-case
     * @param camelCase The name of the icon in camelCase
     * @param element The icon as an `SVGSVGElement`. Use the `outerHTML` property on this to return the icon as a string.
     * @param category The category of the icon.
     * @param tags An array of the icon's tags.
     */
    constructor(
        name: string,
        kebabCase: string,
        camelCase: string,
        element: SVGSVGElement,
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