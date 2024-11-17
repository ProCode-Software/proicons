# ProIcons for React

<p>
    <a href="https://github.com/ProCode-Software/proicons/releases">
        <img src="https://img.shields.io/github/v/release/ProCode-Software/proicons?style=for-the-badge&color=rgb(172, 229, 251)"
            alt="Version">
    </a>
    <a href="">
        <img src="https://img.shields.io/github/stars/ProCode-Software/proicons?style=for-the-badge&color=rgb(255, 215, 142)"
            alt="Stars">
    </a>
    <a href="https://www.npmjs.com/package/@proicons/react">
        <img src="https://img.shields.io/npm/dm/@proicons/react?label=downloads&style=for-the-badge&color=rgb(180, 240, 155)"
            alt="NPM Package">
    </a>
    <a href="https://github.com/ProCode-Software/proicons/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/ProCode-Software/proicons?style=for-the-badge&color=rgb(252, 197, 232)"
            alt="License">
    </a>
</p>

<img src="https://raw.githubusercontent.com/ProCode-Software/proicons/main/.github/images/github-cover-react_light.png#gh-light-mode-only">
<img src="https://raw.githubusercontent.com/ProCode-Software/proicons/main/.github/images/github-cover-react_dark.png#gh-dark-mode-only">

<p align="center">
<br>
An implementation of the <a href="https://github.com/ProCode-Software/proicons" target="_blank">ProIcons</a> icon library for React applications.
<br>
<a href="https://procode-software.github.io/proicons/icons">Browse icons</a> | 
<a href="https://procode-software.github.io/proicons/docs/packages/react">Documentation</a> | 
<a href="https://github.com/ProCode-Software/proicons/tree/main/packages/proicons-react">GitHub</a> | 
<a href="https://www.npmjs.com/package/@proicons/react">NPM</a>
</p>

## Features
- All icons are available as customizable React components
- Supports ESM tree-shaking

**[Read the full documentation here](https://procode-software.github.io/proicons/docs/packages/react)**

## Installation
Install via [NPM](https://npmjs.com/package/@proicons/react):
```shell
npm install @proicons/react
```
> [!IMPORTANT]
> This package is ESM-only. To use in CommonJS contexts, use `await import('@proicons/react')` (asynchronous) or `require('@proicons/react')` in newer Node.js versions.

## Usage
All icons are available as React components named in PascalCase and may end in `Icon`.

To import the Add Square icon:
```jsx
import { SearchIcon } from '@proicons/react'

function App() {
    return (
        <SearchIcon color="red" size={32} />
    )
}
```

## Contributing
For more info on how to contribute, please see our [contributing guide](https://github.com/ProCode-Software/proicons/blob/main/CONTRIBUTING.md).