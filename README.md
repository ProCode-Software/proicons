# ProIcons

<p>
    <a href="https://github.com/ProCode-Software/proicons/releases">
        <img src="https://img.shields.io/github/v/release/ProCode-Software/proicons?style=for-the-badge&color=rgb(172, 229, 251)"
            alt="Version">
    </a>
    <a href="">
        <img src="https://img.shields.io/github/stars/ProCode-Software/proicons?style=for-the-badge&color=rgb(255, 215, 142)"
            alt="Stars">
    </a>
    <a href="https://www.npmjs.com/package/proicons">
        <img src="https://img.shields.io/npm/dm/proicons?label=downloads&style=for-the-badge&color=rgb(180, 240, 155)"
            alt="NPM Package">
    </a>
    <a href="https://github.com/ProCode-Software/proicons/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/ProCode-Software/proicons?style=for-the-badge&color=rgb(252, 197, 232)"
            alt="License">
    </a>
</p>

<img src="https://raw.githubusercontent.com/ProCode-Software/proicons/main/.github/images/github-cover_light.png#gh-light-mode-only">
<img src="https://raw.githubusercontent.com/ProCode-Software/proicons/main/.github/images/github-cover_dark.png#gh-dark-mode-only">

<p align="center">
<br>
<b>A collection of 400+ modern and open-source icons and logos</b>
<br>
<a href="https://procode-software.github.io/proicons/icons">Browse icons</a> | 
<a href="https://procode-software.github.io/proicons/docs/introduction/about">Documentation</a> | 
<a href="https://github.com/ProCode-Software/proicons">GitHub</a> | 
<a href="https://www.npmjs.com/package/proicons">NPM</a>
</p>

## Features
- Highly-customizable icons
- Available for [HTML](https://procode-software.github.io/proicons/docs/html-api), [Node.js](https://procode-software.github.io/proicons/docs/html-api), [React](https://procode-software.github.io/proicons/docs/react) and [Vue](https://procode-software.github.io/proicons/docs/vue)
- Tree-shakable for eliminating unused icons when using a bundler

## Usage

### HTML
ProIcons can be imported via a CDN provider such as UNPKG or [JSDelivr](https://www.jsdelivr.com/package/npm/proicons)

```html
<!-- Insert the icon -->
<i proicon="add"></i>

<script src="https://unpkg.com/proicons"></script>

<!-- Replace icons with SVG -->
<script>
    proicons.replace();
</script>
```

You can also self-host the package by installing it via [NPM](https://www.npmjs.com/package/proicons):

```shell
npm install proicons
```
Then add this `<script>` tag to your HTML:
```html
<script src="path/to/proicons/dist/umd/proicons.cjs"></script>
```

### Node.js
Install the ProIcons package via [NPM](https://www.npmjs.com/package/proicons):

```shell
npm install proicons
```

Then import the package in your script:

```javascript
// Recommended way to import
import { AddIcon } from 'proicons'

console.log(AddIcon.raw) // Returns SVG string
```
Or if you are using CommonJS:
```javascript
const { AddIcon } = require('proicons')

// or
const proicons = require('proicons')
const { AddIcon } = proicons
```

### Webfont
ProIcons also has a webfont version, allowing you to use icons from a stylesheet without the need of scripts, similar to Font Awesome.

[Documentation](https://procode-software.github.io/proicons/docs/webfont)

Import via a CDN:
```html
<link rel="stylesheet" href="https://unpkg.com/@proicons/webfont">
```
Or, install via [NPM](https://npmjs.com/package/@proicons/webfont):

```shell
npm install @proicons/webfont
```
```html
<link rel="stylesheet" href="path/to/@proicons/webfont/ProIcons.css">
```

### React
ProIcons can also be imported as customizable React components.

[Documentation](https://procode-software.github.io/proicons/docs/react)

Install via [NPM](https://npmjs.com/package/@proicons/react):
```shell
npm install @proicons/react
```
```jsx
import { SearchIcon } from '@proicons/react'

function App() {
    return (
        <SearchIcon color="red" size={32} />
    )
}
```
> [!IMPORTANT]
> This package is ESM-only. To use in CommonJS contexts, use `await import('@proicons/react')` (asynchronous) or `require('@proicons/react')` in newer Node.js versions.

### Vue
ProIcons is also available as a Vue package, similar to React. This supports Vue 3, and is also ESM-only.

[Documentation](https://procode-software.github.io/proicons/docs/vue)

Install via [NPM](https://npmjs.com/package/@proicons/vue):

```shell
npm install @proicons/react
```

Then import in your Vue application:
```vue
<script setup lang="ts">
import { AddSquareIcon } from '@proicons/vue'

</script>

<template>
    <AddSquareIcon :size="32" color="red">
</template>
```

# License
ProIcons is 100% free for personal and commercial use, and is licensed under the [MIT License](https://github.com/ProCode-Software/proicons?tab=MIT-1-ov-file).

## Request an icon
If an icon you want isn't in the set, you can request an icon in [discussions](https://github.com/ProCode-Software/proicons/discussions/categories/icon-requests).

## Contributing
For more info on how to contribute, please see our [contributing guide](https://github.com/ProCode-Software/proicons/blob/main/CONTRIBUTING.md).

## Credits
-   Icon design and guidelines inspired by Microsoft's [Fluent System Icons](https://github.com/microsoft/fluentui-system-icons)
-   Alpha bleeding script from https://github.com/Corecii/Transparent-Pixel-Fix
-   API based on [Feather Icons](https://github.com/feathericons/feather)
-   Website design inspired by [Lucide Icons](https://github.com/lucide-icons/lucide)