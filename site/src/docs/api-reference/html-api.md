---
title: HTML
editLink: true
---

# ProIcons HTML
ProIcons are designed to be easy to use inside of HTML. Similar to [Feather Icons](https://github.com/feathericons/feather), ProIcons can be inserted through elements with a `proicon` attribute.

To insert an `Add` icon inside HTML:

```html
<i proicon="add"></i>
```

## Installation
<!--@include: ../introduction/installation.md#install-html-->

## Usage
ProIcons can be added via the `proicon` attribute. Set the attribute value to the name of the icon you want to insert.

To insert an `Add` icon inside HTML:
```html
<i proicon="add"></i>
```

Any case is supported, so all of these will work:
```html
<i proicon="Add Square"></i>
<i proicon="AddSquare"></i>
<i proicon="AddSquareIcon"></i>
<i proicon="addSquare"></i>
<i proicon="add-square"></i>
```

::: tip
The `i` element isn't mandatory, though the `proicon` attribute is. This can be [customized](./options) in the configuration.
:::

Don't forget to add a script to replace these elements.

```html
<script>
    proicons.replace()
</script>
```

[`proicons.replace()`](javascript-api#replace) replaces every element with a `proicon` attribute with their respective icon. It will replace the actual element (in the case shown above `i`) if it doesn't have children, or it will insert the icon inside it as the first element.

## Attributes
ProIcons also can be customized via attributes. These can be applied to individual icon elements.

```html
<i proicon="add" stroke-width="2" color="red"></i>
```
See [Options](./options#proiconsoptions) for the list of properties.