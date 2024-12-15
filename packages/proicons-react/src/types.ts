import * as React from 'react'

export interface ProIconsOptions {
    /** Determines the color of the icons. Defaults to `currentColor`. */
    color?: string
    /** Determines the default stroke width of the icon. Defaults to `1.5`. This only works on SVG elements with existing strokes; add `outline` for this property to affect such elements. */
    strokeWidth?: number
    /** Apply strokes to filled SVG elements, such as circles, by the value of `strokeWidth` with `1.5` (default stroke value) subtracted, if `width` is set to a value above `1.5`. Defaults to `false`
     * @example If `strokeWidth` is set to `2`, filled SVG elements will have an additional `0.5` pixel stroke
     */
    outline?: boolean
    /** Defaults to `round` */
    strokeCaps?: 'round' | 'square' | 'butt'
    /** Defaults to `round` */
    strokeJoin?: 'round' | 'miter' | 'bevel'
    /** Determines the corner radius of SVG elements. Does not apply to all rounded elements. */
    cornerRadius?: number
    /** Determines the size of the icon in pixels. Defaults to `24` */
    size?: number
}

export type ProIconAttributes = React.SVGProps<SVGSVGElement> & ProIconsOptions
