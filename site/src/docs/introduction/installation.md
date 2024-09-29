---
title: Installation
editLink: true
---

# Installation
Getting started with ProIcons doesn't take long. Follow the steps below for your environment

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

```console [NPM]
npm install proicons
```

```console [Yarn]
yarn add proicons
```

```console [PNPM]
pnpm add proicons
```

```console [Bun]
bun add proicons
```

:::
<!-- #endregion install-general -->

Then import your `proicons.js` file in your HTML
```html
<script src="path/to/proicons/dist/proicons.js"></script>
``` 
Replace `path/to/` with the actual path to your `node_modules` folder (relative to the HTML file).
<!-- #endregion install-html -->
## Node.js
<!-- #region install-node -->
Install ProIcons from NPM:

<!--@include: #install-general-->

Then import ProIcons in your script:

```javascript
import * as proicons from 'proicons';
```
Or with CommonJS
```javascript
const proicons = require('proicons');
```
<!-- #endregion install-node -->