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

```
npm install proicons
```
Then import your `proicons.js` file in your HTML
```html
<script src="path/to/proicons/dist/proicons.js"></script>
``` 
Replace `path/to/` with the actual path to your `node_modules` folder (relative to the HTML file).
<!-- #endregion install-html -->
## Node.js
<!-- #region install-node -->
Install ProIcons from NPM:

```
npm install proicons
```

Then import ProIcons using an `import` statement in your script:

```javascript
import proicons from 'proicons';
```
::: info Note
ProIcons is ESM-only and cannot be imported via `require()`. To import in asynchorous CommonJS contexts, use `await import('proicons')`.
:::
<!-- #endregion install-node -->