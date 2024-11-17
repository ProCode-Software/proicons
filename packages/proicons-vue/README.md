# ProIcons for Vue

<p>
    <a href="https://github.com/ProCode-Software/proicons/releases">
        <img src="https://img.shields.io/github/v/release/ProCode-Software/proicons?style=for-the-badge&color=rgb(172, 229, 251)"
            alt="Version">
    </a>
    <a href="">
        <img src="https://img.shields.io/github/stars/ProCode-Software/proicons?style=for-the-badge&color=rgb(255, 215, 142)"
            alt="Stars">
    </a>
    <a href="https://www.npmjs.com/package/@proicons/vue">
        <img src="https://img.shields.io/npm/dm/@proicons/vue?label=downloads&style=for-the-badge&color=rgb(180, 240, 155)"
            alt="NPM Package">
    </a>
    <a href="https://github.com/ProCode-Software/proicons/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/ProCode-Software/proicons?style=for-the-badge&color=rgb(252, 197, 232)"
            alt="License">
    </a>
</p>

<img src="https://raw.githubusercontent.com/ProCode-Software/proicons/main/.github/images/github-cover-vue_light.png#gh-light-mode-only">
<img src="https://raw.githubusercontent.com/ProCode-Software/proicons/main/.github/images/github-cover-vue_dark.png#gh-dark-mode-only">

<p align="center">
<br>
An implementation of the <a href="https://github.com/ProCode-Software/proicons" target="_blank">ProIcons</a> icon library for Vue 3 applications.
<br>
<a href="https://procode-software.github.io/proicons/icons">Browse icons</a> | 
<a href="https://procode-software.github.io/proicons/docs/packages/vue">Documentation</a> | 
<a href="https://github.com/ProCode-Software/proicons/tree/main/packages/proicons-vue">GitHub</a> | 
<a href="https://www.npmjs.com/package/@proicons/vue">NPM</a>
</p>

## Features
- All icons are available as customizable Vue components
- Supports ESM tree-shaking

**[Read the full documentation here](https://procode-software.github.io/proicons/docs/packages/vue)**

## Installation
Install via [NPM](https://npmjs.com/package/@proicons/vue):
```shell
npm install @proicons/vue
```
> [!IMPORTANT]
> This package is ESM-only. To use in CommonJS contexts, use `await import('@proicons/vue')` (asynchronous) or `require('@proicons/vue')` in newer Node.js versions.

## Usage
All icons are available as Vue components named in PascalCase and may end in `Icon`.

To import the Add Square icon:
```vue
<script setup lang="ts">
import { AddSquareIcon } from '@proicons/vue'
// or
import { AddSquare } from '@proicons/vue'
</script>

<template>
    <AddSquareIcon :size="32" color="red">
</template>
```

## Contributing
For more info on how to contribute, please see our [contributing guide](https://github.com/ProCode-Software/proicons/blob/main/CONTRIBUTING.md).