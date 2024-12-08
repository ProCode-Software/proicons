---
title: Installation
editLink: true
---

# Installation
Getting started with ProIcons doesn't take long. Follow the steps below for your environment:

- [HTML](#html)
- [HTML Webfont](#html-webfont)
- [Node.js](#nodejs)
- [React](#react)
- [Vue](#vue)

## HTML
<!-- #region install-html -->
### Method 1: Use a CDN provider

The easiest way to install ProIcons is via a CDN provider such as [UNPKG](https://unpkg.com)

```html
<script src="https://unpkg.com/proicons"></script>
```

### Method 2: Install locally

If you want to use ProIcons locally, you can also install ProIcons via [NPM](https://npmjs.com/package/proicons).

<!-- #region install-general -->
::: code-group

```shell [NPM]
npm install proicons
```

```shell [Yarn]
yarn add proicons
```

```shell [PNPM]
pnpm add proicons
```

```shell [Bun]
bun add proicons
```

:::
<!-- #endregion install-general -->

Then import your `proicons.js` file in your HTML
```html
<script src="path/to/proicons/dist/umd/proicons.cjs"></script>
``` 
Replace `path/to/` with the actual path to your `node_modules` folder (relative to the HTML file).
<!-- #endregion install-html -->
## Node.js
<!-- #region install-node -->
Install ProIcons from NPM:

<!--@include: ./installation.md#install-general-->

```javascript
import { AddIcon } from 'proicons';
```
Or in CommonJS:
```javascript
const proicons = require('proicons');
const { AddIcon } = proicons
```
<!-- #endregion install-node -->
## HTML Webfont
If you prefer not to use any scripts, you can also install ProIcons as a webfont on your site.

<!-- @include: ../packages/webfont.md#install-webfont -->

[Read the documentation](webfont)

## React
<!-- @include: ../packages/react.md#install-react -->

[Read the documentation](react)

## Roblox
<!-- @include: ../packages/roblox.md#install-roblox -->

[Read the documentation](roblox)

## Vue
<!-- @include: ../packages/vue.md#install-vue -->

[Read the documentation](vue)