---
title: Vanilla JS
editLink: true
---

# ProIcons Vanilla JavaScript
Use ProIcons in vanilla JavaScript and Node.js.

## Installation & Setup

<!--@include: ../installation.md#install-node-->

If pairing your JavaScript file with HTML, you can install ProIcons the same way you would with [HTML](installation#html).

## Adding an icon

ProIcons can be imported by importing their name from `proicons`.

Each icon name and alias is in camelCase, PascalCase, and PascalCase ending in Icon. For the 'Add Square' icon, each export would be `AddSquareIcon`, `AddSquare` and `addSquare`.

::: warning
Due to reserved names, it is recommended to import icons by their PascalCase variant (for 'Add', `AddIcon`).

This includes reserved JavaScript keywords such as `delete`, which cannot be imported, and also other functions included in the package, such as `search`, which does not have an export in camelCase.
:::

```javascript
import { AddIcon } from 'proicons'

console.log(AddIcon)
```
This returns the icon as a [`ProIcon`](#proicon) object.

### Converting an icon into an SVG
To convert your icon into an SVG string, use either the [`raw`](#raw-string) property, or the [`toSvg()`](#tosvg) method, which accepts customization options.

```javascript
// Without customization
document.write(AddIcon.raw)

// With customization
const svg = AddIcon.toSvg({
    size: 32,
    color: 'red'
})
document.write(svg)
```

## Methods
Note that all of the following methods break tree-shaking

### replace
-   **Parameters:** `rootElm?: Element`, `config?: ProIconReplaceConfig`
-   **Returns:** `void`
-   **Tree-shakable:** No

Converts all elements with the `proicon` attribute (can be changed with `config.attributeName`) on the page to an icon corresponding to the attribute value.

#### rootElm: `Element` (optional)
* **Default:** `document.body`

The element to search inside for children with the `proicon` attribute.

#### config: [`ProIconReplaceConfig`](./options#proiconreplaceconfig) (optional)
An optional configuration to customise the behaviour of the replace method

#### Example

```html
<div class="demo">
    <i proicon="add"></i>
    <i proicon="delete"></i>
</div>
```

```javascript
const demoElement = document.querySelector('.demo')

proicons.replace(demoElement, {
    strokeWidth: 1.6,
    color: '#ff0000',
})
```

### getIconInfo
-   **Parameters:** `key: string`
-   **Returns:** [`ProIcon`](#proicon) | `undefined`
-   **Tree-shakable:** No

Returns information about an icon from the provided key.

::: tip
This method returns `undefined` if the provided key does not match an icon name in any case. Use [`proicons.search()`](#search) instead to return icons that contain a keyword inside their names or tags.
:::

#### key: `string`
The icon name in Friendly Form, camelCase or kebab-case. Throws an error if the provided key is invalid. Case-insensitive

#### Example
```javascript
import { getIconInfo } from 'proicons'
const iconInfo = getIconInfo('add')

console.log(iconInfo.tags)
// ['Plus', 'Create', 'New', 'Addition']
```

### search
-   **Parameters:** `query: string`
-   **Returns:** [`ProIcon[]`](./javascript-api.md#proicon)
-   **Tree-shakable:** No

Searches for icons with names or tags that contain `key` and returns them as `ProIcon`. Note that the results are in alphabetical order, not the result score.

#### Example
```javascript
import { search } from 'proicons'

const results = search('add')

results.forEach(result => {
    console.log(result)
})
```

## Properties

### categories
-   **Type:** `string[]`
-   **Tree-shakable:** Yes

Lists all icon categories.

### icons
- **Type:** `Record<string, ProIcon>`
- **Tree-shakable:** No

An object containing all icons as [`ProIcon`](#proicon). This is equivalent to all icon exports from `proicons`.

Each icon name and alias is in camelCase, PascalCase, and PascalCase ending in Icon. For the 'Add Square' icon, each export would be `AddSquareIcon`, `AddSquare` and `addSquare`.

::: danger
Using `proicons.icons` is not recommended because it imports all icons, which can affect performance when using a bundler.

To import a single icon by its name, use `import { name } from 'proicons'` instead.

If you want only an array of icon names, import `iconList` using `import { iconList } from 'proicons'`.
:::

### iconList
* **Type:** string[]
- **Tree-shakable:** Yes

List of all icon names in Friendly Case

## Classes

### ProIcon
Contains the information about an icon

**Example:** (for the Add icon)

```typescript
{
    name: "Add",
    kebabCase: "add",
    camelCase: "add",
    raw: string,
    category: "Actions",
    tags: ["Plus", "Create", "New", "Addition"],
    toSvg: function()
}
```

#### name: `string`

The name of the icon in Friendly Form

#### kebabCase: `string`

The name of the icon in kebab-case

#### camelCase: `string`

The name of the icon in camelCase

#### category: `string`

The category of the icon.

#### tags: `string[]`

An array of the icon's tags.

#### raw: `string`
The raw SVG string of the icon. Equivalent to [`toSvg()`](#tosvg) without parameters.

#### toSvg()
* **Parameters:** `options?: ProIconsOptions`
* **Returns:** `string`

Converts the icon into an SVG string with the provided options. This also works outside of a browser environment.

**Example:**
```javascript
import { AddIcon } from 'proicons'

const svg = AddIcon.toSvg({
    color: 'red',
    size: 32
})

document.write(svg)
```

##### options: [`ProIconsOptions`](./options#proiconsoptions) (optional)
Customization options for the converted icon.

## Interfaces

### ProIconsOptions
See [Options](./options#proiconsoptions)

### ProIconReplaceConfig
See [Options](./options#proiconreplaceconfig)
