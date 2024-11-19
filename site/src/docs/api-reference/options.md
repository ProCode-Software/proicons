---
title: Options
editLink: true
---
# Options
Properties can be used to customize ProIcons in HTML and all JavaScript packages, under the `ProIconsOptions` interface. In HTML, Vue and React, these can be applied as attributes of ProIcon components. In JavaScript, these can be used in `ProIcon.toSvg()` and `proicons.replace()`.

```javascript
proicons.replace(document.body, {
    // Example configuration
    color: '#ff0000',
    cornerRadius: 1
})
```
## ProIconsOptions
### attributes
* **Type:** `Record<string, any>`

**Only available in JavaScript.**
In other libraries, attributes should be applied to the icon component.

Attributes to merge with the generated icon `<svg>` element. These may overwrite the default SVG attributes, except for the `class` attribute, which will be merged.

**Example:**
```javascript
import { AddIcon } from 'proicons'

AddIcon.toSvg({
    attributes: {
        id: 'myIcon',
        'data-myattr': 'example'
    }
})
```

### color
* **Type:** `string`
* **HTML Attribute:** `color`
* **Default:** `currentColor`

Determines the color of the icons.

### cornerRadius
* **Type:** `number`
* **HTML Attribute:** `corner-radius`

Determines the corner radius of SVG elements. Does not apply to all rounded elements.

### size
* **Type:** `number`
* **HTML Attribute:** `size`
* **Default:** `24`

Determines the size of the icon in pixels. This sets both `width` and `height` attributes on the SVG element

### strokeCaps
* **Type:** `'round'` | `'square'` | `'butt'`
* **HTML Attribute:** `caps`
* **Default:** `round`

Defines the shape to be used for stroke caps.

### strokeFilledElements
* **Type:** `boolean`
* **HTML Attribute:** `outline`
* **Default:** `false`

Apply strokes to filled SVG vectors, such as circles, by the provided amount with `1.5` (default stroke value) subtracted, if `strokeWidth` is set to a value above `1.5`.

For example, if `strokeWidth` is set to `2`, filled SVG elements will have an additional 0.5px stroke. This can be used to keep SVG elements balanced when customizing the stroke width.

### strokeJoin
* **Type:** `'round'` | `'miter'` | `'bevel'`
* **HTML Attribute:** `join`
* **Default:** `round`

Defines the shape to be used for stroke joins.

### strokeWidth
* **Type:** `number`
* **HTML Attribute:** `stroke-width`
* **Default:** `1.5`

Determines the default stroke width of the icon. This only works on SVG elements with existing strokes; add `strokeFilledElements` for this property to affect such elements.

## ProIconReplaceConfig
Properties used to customize the [`proicons.replace()`](./javascript-api#replace) method in JavaScript.
This is only available in [JavaScript](./javascript-api) and in the `proicons` package.

All properties available in `ProIconsOptions` can be used in `ProIconReplaceConfig`.

This interface is used to customize the [`proicons.replace()`](./javascript-api#replace) method.
To use a configuration, pass the configuration as the second argument when calling `proicons.replace()`. Most configuation properties can be applied to individual elements in [HTML](html-api#attributes).

### attributeName
* **Type:** `string`
* **Default:** `proicon`

The attribute name that is checked for when converting elements to icons.

### overwrite
* **Type:** `boolean` | `'auto'`
* **Default:** `auto`

Determines whether to overwrite elements when converting to icons. If set to `auto`, this will overwrite the element only if it does not have any children.

### useAttributes
* **Type:** `boolean`
* **Default:** `true`

Determines whether to apply existing HTML attributes such as styles to the converted SVGs.