---
title: HTML API
editLink: true
---
# HTML API
ProIcons are designed to be easy to use inside of HTML. Similar to [Feather Icons](https://github.com/feathericons/feather), ProIcons can be inserted through elements with a `proicon` attribute.

To insert an `Add` icon inside HTML:

```html
<i proicon="add"></icon>
```
## Installation
<!--@include: ../introduction/installation.md#install-html-->

## Usage

As mentioned earlier, ProIcons can be added via the `proicon` attribute. Set the attribute value to the name of the icon you want to insert. (You can use any supported case)

To insert an `Add` icon inside HTML:

```html
<i proicon="add"></icon>
```

> [!TIP]
> The `i` element isn't mandatory, though the `proicon` attribute is, unless you [customize](./configuration) the configuration.

Next, add a script to replace these elements.

```html
<script>
    proicons.replace();
</script>
```

`proicons.replace()` replaces every element with a `proicon` attribute with their respective icon. It will replace the actual element (in the case shown above `i`) if it doesn't have children, or it will insert the icon inside it as the first element.

## Attributes

ProIcons also can be customized via attributes. These can be applied to individual icon elements and are available in the JavaScript [configuration](./configuration).

```html
<i proicon="add" color="red"></i>
```

### color
* **Type:** `number`

Determines the color of the icon

### stroke-width
* **Type:** `number`

Defines the thickness of the icon's stroke

### join
* **Type:** <code>round</code> | <code>miter</code> | <code>bevel</code>

Defines the shape to be used for stroke joins.

### caps
* **Type:** <code>round</code> | <code>square</code> | <code>butt</code>

Defines the shape to be used for stroke caps.

### corner-radius
* **Type:** `number`

Determines the corner radius of the icon. May not work with all icons.

### outline
* **Type:** `boolean`

Determines whether to add additional strokes to filled SVG elements.