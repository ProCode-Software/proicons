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

ProIcons also can be customized via attributes.

```html
<i proicon="add" color="red"></i>
```
All of the available HTML attributes are shown below:

<table>
    <tr>
        <th>Attribute</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>color</code></td>
        <td>Color</td>
        <td>Determines the color of the icon</td>
    </tr>
    <tr>
        <td><code>stroke-width</code></td>
        <td>Number</td>
        <td>Defines the thickness of the icon's stroke</td>
    </tr>
    <tr>
        <td><code>join</code></td>
        <td><code>round</code> | <code>miter</code> | <code>bevel</code></td>
        <td>Defines the shape to be used for stroke joins.</td>
    </tr>
    <tr>
        <td><code>caps</code></td>
        <td><code>round</code> | <code>square</code> | <code>butt</code></td>
        <td>Defines the shape to be used for stroke caps.</td>
    </tr>
    <tr>
        <td><code>corner-radius</code></td>
        <td>Number</td>
        <td>Determines the corner radius of the icon. May not work with all icons.</td>
    </tr>
    <tr>
        <td><code>outline</code></td>
        <td>Boolean</td>
        <td>Determines whether to add additional strokes to filled SVG elements.</td>
    </tr>
</table>