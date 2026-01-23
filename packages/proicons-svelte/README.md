# ProIcons for Svelte

<p>
    <a href="https://github.com/ProCode-Software/proicons/releases">
        <img src="https://img.shields.io/github/v/release/ProCode-Software/proicons?style=for-the-badge"
            alt="Version">
    </a>
    <a href="https://github.com/ProCode-Software/proicons">
        <img src="https://img.shields.io/github/stars/ProCode-Software/proicons?style=for-the-badge"
            alt="Stars">
    </a>
    <a href="https://www.npmjs.com/package/@proicons/svelte">
        <img src="https://img.shields.io/npm/dm/@proicons/svelte?label=downloads&style=for-the-badge"
            alt="NPM Package">
    </a>
    <a href="https://github.com/ProCode-Software/proicons/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/ProCode-Software/proicons?style=for-the-badge"
            alt="License">
    </a>
</p>

<img src="https://raw.githubusercontent.com/ProCode-Software/proicons/main/.github/images/github-cover-svelte_light.png#gh-light-mode-only">
<img src="https://raw.githubusercontent.com/ProCode-Software/proicons/main/.github/images/github-cover-svelte_dark.png#gh-dark-mode-only">

<p align="center">
<br>
An implementation of the <a href="https://github.com/ProCode-Software/proicons" target="_blank">ProIcons</a> icon library for Svelte applications.
<br>
<a href="https://procode-software.github.io/proicons/icons">Browse icons</a> | 
<a href="https://procode-software.github.io/proicons/docs/svelte">Documentation</a> | 
<a href="https://github.com/ProCode-Software/proicons/tree/main/packages/proicons-svelte">GitHub</a> | 
<a href="https://www.npmjs.com/package/@proicons/svelte">NPM</a>
</p>

## Features

- All icons are available as customizable Svelte components
- Supports ESM tree-shaking

**[Read the full documentation here](https://procode-software.github.io/proicons/docs/svelte)**

## Installation

Install via [NPM](https://npmjs.com/package/@proicons/svelte):

```shell
npm install @proicons/svelte
```

## Usage

All icons are available as Svelte components named in PascalCase and may end in `Icon`.

To import the Add Square icon:

```svelte
<script>
import { SearchIcon } from '@proicons/svelte'

</script>

<SearchIcon color="red" size={32} />
```

There are several ways to import an icon into your Svelte component. These are all the same:

```javascript
import { AddIcon } from '@proicons/svelte'
import { AddIcon } from '@proicons/svelte/icons'
import AddIcon from '@proicons/svelte/AddIcon'
```

## Request an icon

If an icon you want isn't in the set, you can request an icon in [discussions](https://github.com/ProCode-Software/proicons/discussions/categories/icon-requests).

## Contributing

For more info on how to contribute, please see our [contributing guide](https://github.com/ProCode-Software/proicons/blob/main/CONTRIBUTING.md).
