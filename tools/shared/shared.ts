import { kebabCase, pascalCase } from './rename.ts'

export * from './rename.ts'
export * from './renderNodes.ts'
export * from './types.ts'

/**
 * Searches `icons` for an icon with the given `name` (can be in any case) and returns the PascalCase name of the icon, or `undefined` if not found.
 * @param icons The icons to search in.
 * @param name The name of the icon to search for.
 * @returns The PascalCase name of the icon, or `undefined` if not found.
 */
export function getPascalName(
    icons: Record<string, any>,
    name: string
): keyof typeof icons | undefined {
    name = name.replace(/Icon$/i, '')
    const lowerName = name.toLowerCase()
    return name in icons
        ? name
        : Object.keys(icons).find(pascalName => {
              // Doesn't end in Icon
              const lowerIconName = pascalName.replace(/Icon$/i, '').toLowerCase()
              return (
                  lowerIconName == lowerName ||
                  kebabCase(lowerIconName) == lowerName ||
                  pascalName == pascalCase(name)
              )
          })
}

export interface SharedProIconsOptions {
    /** Determines the color of the icons. Defaults to `currentColor`. */
    color?: string
    /** Determines the default stroke width of the icon. Defaults to `1.5`. This only works on SVG elements with existing strokes; add `strokeFilledElements` for this property to affect such elements. */
    strokeWidth?: number
    /** Apply strokes to filled SVG elements, such as circles, by the provided amount with `1.5` (default stroke value) subtracted, if `strokeWidth` is set to a value above `1.5`. Defaults to `false`
     *
     * For example, if `strokeWidth` is set to `2`, filled SVG elements will have an additional 0.5px stroke
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
    attributes?: Record<string, any>
}
