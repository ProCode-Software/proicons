---
title: Vue
---

# ProIcons for Vue
Icon library with high-quality, customizable SVGs that can easily be used in [Vue 3](https://vuejs.org) applications, with support for tree-shaking.

[View on NPM](https://npmjs.com/package/@proicons/vue) |
[GitHub](https://github.com/ProCode-Software/proicons/tree/main/packages/proicons-vue)

## Installation
<!-- #region install-vue -->
Install via NPM:

::: code-group

```shell [NPM]
npm install @proicons/vue
```

```shell [Yarn]
yarn add @proicons/vue
```

```shell [PNPM]
pnpm add @proicons/vue
```

```shell [Bun]
bun add @proicons/vue
```
:::
<!-- #endregion install-vue -->
::: warning Important
This package is ESM only. To use in CommonJS contexts, use `await import('@proicons/vue')` (asynchronous) or `require('@proicons/vue')` in newer Node.js versions.
:::

## Usage
ProIcons can be imported by the icon name in PascalCase, and may end in `Icon`. The icon `Add` can be imported using either `Add` or `AddIcon`.

```vue
<script setup lang="ts">
import { AddSquareIcon } from '@proicons/vue'

</script>

<template>
    <AddSquareIcon :size="32" color="red">
</template>
```
Props from [`ProIconsOptions`](options#proiconsoptions) can be used to customize icons. These components get converted into `<svg>` elements with your configuration.

## `ProIcon` Component
This package also includes a generic `ProIcon` component allowing you to import icons by their name. This is equivalent to the [HTML API](html-api).

::: danger
Using the `<ProIcon>` component imports all icons and breaks tree-shaking, which can increase bundle size when using module bundlers such as Webpack or Rollup.
:::

```vue
<script setup lang="ts">
import { ProIcon } from '@proicons/vue'

</script>

<template>
    <ProIcon icon="Add Square" :size="32">
    
    <!-- Other forms are allowed -->
    <ProIcon icon="AddSquare" :size="32">
    <ProIcon icon="AddSquareIcon" :size="32">
    <ProIcon icon="addSquare" :size="32">
    <ProIcon icon="add-square" :size="32">
</template>
```

All customization attributes on individual icons are also available on the `ProIcon` component.