# ProIcons

<img src="https://raw.githubusercontent.com/ProCode-Software/proicons/main/.github/images/github-cover_light.png#gh-light-mode-only">
<img src="https://raw.githubusercontent.com/ProCode-Software/proicons/main/.github/images/github-cover_dark.png#gh-dark-mode-only">

<p align="center">
    <a href="https://github.com/ProCode-Software/proicons/releases">
        <img src="https://img.shields.io/github/v/release/ProCode-Software/proicons?style=for-the-badge&color=orange"
            alt="Version">
    </a>
    <a href="">
        <img src="https://img.shields.io/github/stars/ProCode-Software/proicons?style=for-the-badge"
            alt="Stars">
    </a>
    <a href="https://www.npmjs.com/package/proicons">
        <img src="https://img.shields.io/npm/dm/proicons?label=downloads&amp;style=for-the-badge"
            alt="NPM Package">
    </a>
    <a href="https://github.com/ProCode-Software/proicons/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/ProCode-Software/proicons?style=for-the-badge"
            alt="License">
    </a>
</p>

<p align="center">
    <b>A collection of 400+ modern and open-source icons and logos</b>
    <br>
    <a href="https://procode-software.github.io/proicons">Icons</a> | 
    <a href="https://procode-software.github.io/proicons/docs/introduction/about">Documentation</a> | 
    <a href="https://github.com/ProCode-Software/proicons">GitHub</a> | 
    <a href="https://www.npmjs.com/package/proicons">NPM Package</a>
</p>

> **Work in progress**
> 
> Most of the website and planned packages aren't currently finished, but you can start using the beta package right now on NPM. See [ROADMAP.md](/ROADMAP.md) to learn more.

## Usage

### Node.js

1. Install the ProIcons package via [NPM](https://www.npmjs.com/package/proicons):

```
npm install proicons
```

2. Use ProIcons inside JavaScript

```javascript
import { icons } from 'proicons';
// or
const { icons } = require('proicons')

// Refer to the icon
icons.add;
```

_or_

```html
<!-- Insert the icon -->
<i proicon="add"></i>

<script src="path/to/proicons/dist/umd/proicons.cjs"></script>

<!-- Replace icons with SVG -->
<script>
    proicons.replace();
</script>
```

### HTML
You can import the ProIcons package via a CDN provider

```html
<!-- Insert the icon -->
<i proicon="add"></i>

<script src="https://unpkg.com/proicons"></script>

<!-- Replace icons with SVG -->
<script>
    proicons.replace();
</script>
```

## License

ProIcons is MIT-licensed, giving you peace of mind using these icons in your project. Learn more [here](./LICENSE)

> [!WARNING]
> This library contains brand icons that may not be MIT-licensed and may have additional terms and guidelines. Learn more [here](https://procode-software.github.io/proicons/docs/introduction/about#usage-of-brand-icons)

## Contributing
For more info on how to contribute, please see our [contributing guide](https://github.com/ProCode-Software/proicons/blob/main/CONTRIBUTING.md).

## Credits

-   Icon design and guidelines inspired by Microsoft's [Fluent System Icons](https://github.com/microsoft/fluentui-system-icons)
-   Alpha bleeding script from https://github.com/Corecii/Transparent-Pixel-Fix
-   API based on [Feather Icons](https://github.com/feathericons/feather)
-   Website design inspired by [Lucide](https://github.com/lucide-icons/lucide) and built using [VitePress](https://github.com/vuejs/vitepress)