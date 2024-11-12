---
title: ProIcons React
---

# ProIcons React
Icon library that can easily be used in [React](https://react.dev) applications, with support for tree-shaking.

[View on NPM](https://npmjs.com/package/@proicons/react)

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
These components get converted into `<svg>` elements, and can be customized using 