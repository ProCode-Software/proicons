# ProIcons

<img src="./.github/images/github-cover_light.png#gh-light-mode-only">
<img src="./.github/images/github-cover_dark.png#gh-dark-mode-only">

<p align="center">
    <a href="https://github.com/ProCode-Software/proicons/releases">
        <img src="https://img.shields.io/npm/v/proicons?style=for-the-badge&color=orange"
            alt="NPM Version">
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
    <a href="https://github.com/ProCode-Software/proicons/wiki">Documentation</a> | 
    <a href="https://github.com/ProCode-Software/proicons">GitHub</a> | 
    <a href="https://www.npmjs.com/package/proicons">NPM Package</a>
</p>

## Usage

### Node.js

1. Install the ProIcons package via [NPM](https://www.npmjs.com/package/proicons):

```
npm install proicons
```

2. Use ProIcons inside JavaScript

```javascript
import proicons from 'proicons';

// Refer to the icon
proicons.icons.add;
```

_or_

```html
<!-- Insert the icon -->
<i proicon="add"></i>

<script src="path/to/proicons/dist/proicons.js"></script>

<!-- Replace icons with SVG -->
<script>
    proicons.replace();
</script>
```

### HTML

If you are not inside a Node environment, you can import the ProIcons script via a CDN provider

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
> I do not own any of the logos used in the icon pack nor am I affiliated with their companies. Please use these logos under their respective company's terms and guidelines.

## Credits

-   Icon design and guidelines inspired by Microsoft's [Fluent System Icons](https://github.com/microsoft/fluentui-system-icons)
-   Alpha bleeding script from https://github.com/Corecii/Transparent-Pixel-Fix
-   API based on [Feather Icons](https://github.com/feathericons/feather)

<img src="https://img.shields.io/badge/dynamic/json?label=icons&style=for-the-badge&prefix=%20&query=%24%5B%3F(%40.length)%5D&url=https://raw.githubusercontent.com/ProCode-Software/proicons/main/src/configs/icons.json" alt="Number of icons currently in the library"/>