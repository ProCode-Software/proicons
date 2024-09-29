---
title: ProIcons Webfont
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

```console [NPM]
npm install @proicons/webfont
```

```console [Yarn]
yarn add @proicons/webfont
```

```console [PNPM]
pnpm add @proicons/webfont
```

```console [Bun]
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
If importing a variable icon such as `add-square-multiple--var`, make sure to only use one hyphen before `var`. This class name woul be replaced with `add-square-multiple-var`.
:::

## Caveats
- There is no tree-shaking
- Icon strokes cannot be customized