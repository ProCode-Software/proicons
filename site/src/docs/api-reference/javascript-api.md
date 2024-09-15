---
title: JavaScript ProIcons API
editLink: true
---
# JavaScript ProIcons API

## Installation & Setup
<!--@include: ../introduction/installation.md#install-node-->

If pairing your JavaScript file with HTML, you can install ProIcons the same way you would with [HTML](../introduction/installation.md#html).

## Adding an icon

ProIcons can be imported using `proicons.icons.[icon name]`

```javascript
import proicons from 'proicons';

document.write(proicons.icons.add);
```

::: info
This returns the icon as an SVG string. If you want to return the metadata of an icon, including the actual element, use [`proicons.getIconInfo()`]()
:::

## All Methods

### `proicons.replace(rootElm?: Element, config?: ProIconReplaceConfig)`: void

Converts all elements with the `proicon` attribute (can set to your own using `config.attributeName`) on the page to an icon corresponding to the attribute value.

#### `rootElm`: Element (optional)

The element to search inside for children with the `proicon` attribute. Defaults to `document.body`.

#### `config`: [ProIconReplaceConfig](./configuration) (optional)

An optional configuration to customise the behaviour of the replace method

#### Example

**HTML:**

```html
<div class="demo">
    <i proicon="add"></i>
    <i proicon="delete"></i>
</div>
```

**JS:**

```javascript
const demoElement = document.querySelector('.demo');

proicons.replace(demoElement, {
    strokeWidth: 1.6,
    color: '#ff0000',
});
```

### `proicons.getIconInfo(key: string)`: [ProIconInfo](./javascript-api.md#proiconinfo)[]

Returns information about an icon from the provided key.

::: warning
This method throws an error if the provided key does not match an icon name in Friendly Form, camelCase or kebab-case. Use [`proicons.search()`](#proiconssearchkey-string-proiconinfo) instead to return icons that contain a keyword inside its name or tags.
:::

#### `key`: string

The icon name in Friendly Form, camelCase or kebab-case. Throws an error if the provided key is invalid. Case-insensitive

#### Example

```javascript
const iconInfo = proicons.getIconInfo('add');

console.log(iconInfo.tags);
// ['Plus', 'Create', 'New', 'Addition']
```

### `proicons.search(key: string)`: [ProIconInfo](./javascript-api.md#proiconinfo)[]

Searches for icons with names or tags that contain `key` and returns them as `ProIconInfo`. Unlike [`proicons.getIconInfo()`](#proiconsgeticoninfokey-string-proiconinfo), you can search for icons via tags without throwing an error.

#### Example

```javascript
const icons = proicons.search('add');

icons.forEach((icon) => {
    console.log(icon);
});
```
## Properties

### `categories`: string[]

Lists all icon categories.

### `icons`

An object containing all icons as SVG strings with camelCase keys

#### Example

```javascript
console.log(proicons.icons.add);
// <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12H12M12 12L20 12M12 12V4M12 12L12 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
```

## Classes

### `ProIconInfo`

Contains the information about an icon

**Example:**

```javascript
{
    name: "Add",
    kebabCase: "add",
    camelCase: "add",
    element: Element,
    category: "Actions",
    tags: [ "Plus", "Create", "New", "Addition" ]
}
```

#### `name`: string

The name of the icon in Friendly Form

#### `kebabCase`: string

The name of the icon in kebab-case

#### `camelCase`: string

The name of the icon in camelCase

#### `element`: SVGSVGElement

The icon as an `SVGElement`. Use the `outerHTML` property on this to return the icon as a string.

#### `category`: string

The category of the icon.

#### `tags`: string[]

An array of the icon's tags.

### Interface `ProIconReplaceConfig`

See [Configuration](./configuration)
