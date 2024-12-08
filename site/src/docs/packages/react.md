---
title: React
---

# ProIcons for React
Icon library with high-quality, customizable SVGs that can easily be used in [React](https://react.dev) applications, with support for tree-shaking.

[View on NPM](https://npmjs.com/package/@proicons/react) |
[GitHub](https://github.com/ProCode-Software/proicons/tree/main/packages/proicons-react)

## Installation
<!-- #region install-react -->
Install via NPM:

::: code-group

```shell [NPM]
npm install @proicons/react
```

```shell [Yarn]
yarn add @proicons/react
```

```shell [PNPM]
pnpm add @proicons/react
```

```shell [Bun]
bun add @proicons/react
```
:::
<!-- #endregion install-react -->
::: warning Important
This package is ESM only. To use in CommonJS contexts, use `await import('@proicons/react')` (asynchronous) or `require('@proicons/react')` in newer Node.js versions.
:::

## Usage
ProIcons can be imported by the icon name in PascalCase, and may end in `Icon`. The icon `Add` can be imported using either `Add` or `AddIcon`.

```jsx
import { SearchIcon } from '@proicons/react'

function App() {
    return (
        <SearchIcon color="red" size={32} />
    )
}
```
Props from [`ProIconsOptions`](options#proiconsoptions) can be used to customize icons. These components get converted into `<svg>` elements with your configuration.

## `ProIcon` Component
This package also includes a generic `ProIcon` component allowing you to import icons by their name. This is equivalent to the [HTML API](html-api).

::: danger
Using the `<ProIcon>` component imports all icons and breaks tree-shaking, which can increase bundle size when using module bundlers such as Webpack or Rollup.
:::

```jsx
<ProIcon icon="Add Square" size={32} />

// Other forms are allowed
<ProIcon icon="AddSquare" size={32} />
<ProIcon icon="AddSquareIcon" size={32} />
<ProIcon icon="addSquare" size={32} />
<ProIcon icon="add-square" size={32} />
```

All customization attributes on individual icons are also available on the `ProIcon` component.