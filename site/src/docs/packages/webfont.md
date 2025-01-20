---
title: Webfont
---

# ProIcons Webfont
Use ProIcons as a webfont on your site without the need of using scripts. Contains TTF, WOFF, WOFF2 and EOT formats.

[View on NPM](https://npmjs.com/package/@proicons/webfont)

## Installation
<!-- #region install-webfont -->
### Import via UNPKG
```html
<link rel="stylesheet" href="https://unpkg.com/@proicons/webfont">
```
### Install package via NPM
::: code-group

```shell [NPM]
npm install @proicons/webfont
```

```shell [Yarn]
yarn add @proicons/webfont
```

```shell [PNPM]
pnpm add @proicons/webfont
```

```shell [Bun]
bun add @proicons/webfont
```
:::

```html
<link rel="stylesheet" href="path/to/@proicons/webfont/ProIcons.css">
```
<!-- #endregion install-webfont -->
## Usage
Import a ProIcon by creating an `<i>` element with the class `proicon-[icon name]`. Make sure the icon name is in kebab-case.

To import the Add icon:
```html
<i class="proicon-add"></i>
```
::: info Important
If importing a variable icon such as `add-square-multiple--var`, make sure to only use one hyphen before `var`. This class name would be replaced with `add-square-multiple-var`.
:::

## Caveats
- Like all icon fonts, icons may have a lower quality or be misaligned
- There is no tree-shaking, all fonts and icons will be imported
- Icon strokes cannot be customized

These features are available in the [ProIcons HTML](html-api) package