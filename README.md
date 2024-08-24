# ProIcons
<img src="./.github/images/cover.png">

  [![Version](https://img.shields.io/npm/v/proicons?style=for-the-badge)](https://github.com/ProCode-Software/proicons/releases)
[![Stars](https://img.shields.io/github/stars/ProCode-Software/proicons?style=for-the-badge&color=edd311)]()
[![NPM Package](https://img.shields.io/npm/dm/proicons?color=98E8F3&label=downloads&style=for-the-badge)](https://www.npmjs.com/package/proicons)

<p align="center"><b>A collection of 400+ modern and open-source icons</b></p>

## Usage
### Node.js
1. Install the ProIcons package via [NPM](https://https://www.npmjs.com/package/proicons):
```console
npm install proicons
```
2. Use ProIcons inside JavaScript
```javascript
import proicons from 'proicons'

// Refer to the icon
proicons.icons.add
```
_or_

```html
<!-- Insert the icon -->
<i proicon="add"></i>

<script src="path/to/proicons/dist/proicons.js"></script>

<!-- Replace icons with SVG -->
<script>proicons.replace()</script>
```

### HTML
If you are not inside a Node environment, you can import the ProIcons script via a CDN provider

```html
<!-- Insert the icon -->
<i proicon="add"></i>

<script src="https://unpkg.com/proicons"></script>

<!-- Replace icons with SVG -->
<script>proicons.replace()</script>
```

## Roadmap
- [ ] Write documentation and guidelines
- [ ] PNG source code
- [ ] Figma plugin


## License
ProIcons is MIT-licensed, giving you peace of mind using these icons in your project. Learn more [here](./LICENSE)

## Credits
- Icon design and guidelines inspired by Microsoft's [Fluent System Icons](https://github.com/microsoft/fluentui-system-icons)
- Alpha bleeding script from https://github.com/Corecii/Transparent-Pixel-Fix
- API based on [Feather Icons](https://github.com/feathericons/feather)