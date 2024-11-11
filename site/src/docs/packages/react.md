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

```console [NPM]
npm install @proicons/react
```

```console [Yarn]
yarn add @proicons/react
```

```console [PNPM]
pnpm add @proicons/react
```

```console [Bun]
bun add @proicons/react
```
:::

Then import your icon as a JSX component:
```jsx
import { SearchIcon } from '@proicons/react'

function App() {
    return (
        <SearchIcon color="red" size={32} />
    )
}
```
<!-- #endregion install-react -->

## Usage
Import a ProIcon by creating an `<i>` element with the class `proicon-[icon name]`. Make sure the icon name is in kebab-case.

To import the Add icon:
```html
<i class="proicon-add"></i>
```
::: info Important
If importing a variable icon such as `add-square-multiple--var`, make sure to only use one hyphen before `var`. This class name woul be replaced with `add-square-multiple-var`.
:::