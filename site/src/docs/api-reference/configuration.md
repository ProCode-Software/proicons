---
title: Configuration API
editLink: true
---
# Configuration API
A configuration can be used to customize the [`proicons.replace()`](./javascript-api#replace) method.
To use a configuration, pass the configuration as the second argument when calling `proicons.replace()`.

```javascript
proicons.replace(document.body, {
    // Example configuration
    color: '#ff0000',
    cornerRadius: 1
})
```
## Properties
### color
* **Type**: `string`

Determines the color of the icons. Defaults to `currentColor`

### strokeWidth
* **Type**: `number`

Determines the default stroke width of the icon. Defaults to `1.5`. This only works on SVG elements with existing strokes; add `strokeFilledElements` for this property to affect such elements.

### strokeFilledElements
* **Type**: `boolean`

Apply strokes to filled SVG elements, such as circles, by the provided amount with `1.5` (default stroke value) subtracted, if `strokeWidth` is set to a value above `1.5`. Defaults to `false`

For example, if `strokeWidth` is set to `2`, filled SVG elements will have an additional `0.5`px stroke

### strokeCaps
* **Type**: `'round'` | `'square'` | `'butt'`

Defines the shape to be used for stroke caps. Defaults to `round`

### strokeJoin
* **Type**: `'round'` | `'miter'` | `'bevel'`

Defines the shape to be used for stroke joins. Defaults to `round`

### cornerRadius
* **Type**: `number`

Determines the corner radius of SVG elements. Does not apply to all rounded elements.

### attributeName
* **Type**: `string`

The attribute name that is checked for when converting elements to icons. Defaults to `proicon`

### overwrite
* **Type**: `boolean` | `'auto'`

Determines whether to overwrite elements when converting to icons. Setting this to `auto` will overwrite only if the element does not have any children. Defaults to `auto`.

### useAttributes
* **Type**: `boolean`

Determines whether to apply existing HTML attributes such as styles to the converted SVGs. Defaults to `true`
