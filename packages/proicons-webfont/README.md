# ProIcons Webfont

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
    <a href="https://www.npmjs.com/package/@proicons/webfont">
        <img src="https://img.shields.io/npm/dm/@proicons/webfont?label=downloads&amp;style=for-the-badge"
            alt="NPM Package">
    </a>
    <a href="https://github.com/ProCode-Software/proicons/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/ProCode-Software/proicons?style=for-the-badge"
            alt="License">
    </a>
</p>

<p align="center">
    <b>Webfont version of the <a href="https://github.com/ProCode-Software/proicons" target="_blank">ProIcons</a> icon library</b>
    <br>
    <a href="https://procode-software.github.io/proicons">Icons</a> | 
    <a href="https://procode-software.github.io/proicons/docs/packages/webfont">Documentation</a> | 
    <a href="https://github.com/ProCode-Software/proicons/tree/main/packages/proicons-webfont">GitHub</a> | 
    <a href="https://www.npmjs.com/package/@proicons/webfont">NPM Package</a>
</p>

## Features
- Works out of the box, no scripts needed.
- Contains TTF, WOFF, WOFF2 and EOT formats

**[Read the full documentation here](https://procode-software.github.io/proicons/docs/packages/webfont)**

## Installation
### Import via UNPKG
```html
<link rel="stylesheet" href="https://unpkg.com/@proicons/webfont">
```
### Install via NPM
```console
npm install @proicons/webfont
```
```html
<link rel="stylesheet" href="path/to/@proicons/webfont/ProIcons.css">
```

## Usage
Import a ProIcon by creating an `<i>` element with the class `proicon-[icon name]`. Make sure the icon name is in kebab-case.

To import the Add icon:
```html
<i class="proicon-add"></i>
```
> [!IMPORTANT]
> If importing a variable icon such as `add-square-multiple--var`, make sure to only use one hyphen before `var`. This class name woul be replaced with `add-square-multiple-var`.