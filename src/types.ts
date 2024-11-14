import { IconNode } from './createIcon'
import * as rename from './rename'
import { convertNodesWithConfig, renderNodeWithRoot, rootNode } from './renderNodes'

export interface ProIconsOptions {
    /** Determines the color of the icons. Defaults to `currentColor`. */
    color?: string
    /** Determines the default stroke width of the icon. Defaults to `1.5`. This only works on SVG elements with existing strokes; add `strokeFilledElements` for this property to affect such elements. */
    strokeWidth?: number
    /** Apply strokes to filled SVG elements, such as circles, by the provided amount with `1.5` (default stroke value) subtracted, if `strokeWidth` is set to a value above `1.5`. Defaults to `false`
     * @example If `strokeWidth` is set to `2`, filled SVG elements will have an additional `0.5`px stroke
     */
    strokeFilledElements?: boolean
    /** Defaults to `round` */
    strokeCaps?: 'round' | 'square' | 'butt'
    /** Defaults to `round` */
    strokeJoin?: 'round' | 'miter' | 'bevel'
    /** Determines the corner radius of SVG elements. Does not apply to all rounded elements. */
    cornerRadius?: number

    /** Determines the size of the icon in pixels. Defaults to `24` */
    size?: number

    /**
     * Attributes to merge with the generated icon
     * @example
     * {
     *   attributes: {
     *     'data-myattr': 'Example',
     *     id: 'myIcon'
     *   }
     * }
     */
    attributes: Record<string, string>
}

export interface ProIconReplaceConfig extends ProIconsOptions {
    /** The attribute name that is checked for when converting elements to icons. Defaults to `proicon`. */
    attributeName?: string
    /** Determines whether to overwrite elements when converting to icons. Setting this to `auto` will overwrite only if the element does not have any children. Defaults to `auto`. */
    overwrite?: boolean | 'auto'
    /** Determines whether to apply existing HTML attributes such as styles to the converted SVGs. Defaults to `true` */
    useAttributes?: false
}

export class ProIcon {
    #nodes: IconNode[] = []

    /** The name of the icon in Friendly Form */
    name: string

    /** The name of the icon in kebab-case */
    kebabCase: string

    /** The name of the icon in camelCase */
    camelCase: string

    /** The icon as an `SVGSVGElement`. Use the `outerHTML` property on this to return the icon as a string. */
    element: SVGSVGElement

    /** The category of the icon. */
    category: string

    /** An array of the icon's tags. */
    tags: string[]

    /**
     * The raw SVG string of the icon, with the default properties
     * Use `toSvg()` instead to use custom properties
     */
    raw: string

    /**
     *
     * @param name The name of the icon in Friendly Form
     * @param kebabCase The name of the icon in kebab-case
     * @param camelCase The name of the icon in camelCase
     * @param category The category of the icon.
     * @param tags An array of the icon's tags.
     */
    constructor(name: string, tags: string[], category: string, nodes: IconNode[]) {
        this.name = name
        this.kebabCase = rename.kebabCase(name)
        this.camelCase = rename.camelCase(name)
        this.tags = tags ?? []
        this.category = category

        this.#nodes = nodes
        this.raw = this.toSvg()
    }

    /**
     * Returns an SVG string from the icon with the provided options
     * Note that this also works outside of a browser environment
     * @param options Customization options for the icon
     */
    toSvg(options?: ProIconsOptions): string {
        return renderNodeWithRoot(
            convertNodesWithConfig(this.#nodes, options),
            rootNode,
            options
        )
    }
}
