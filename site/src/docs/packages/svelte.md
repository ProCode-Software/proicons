---
title: Svelte
---

# ProIcons for Svelte
Icon library with high-quality, customizable SVGs that can easily be used in [Svelte 5](https://svelte.dev) applications, with support for tree-shaking.

[View on NPM](https://npmjs.com/package/@proicons/svelte) |
[GitHub](https://github.com/ProCode-Software/proicons/tree/main/packages/proicons-svelte)

## Installation
<!-- #region install-svelte -->
Install via NPM:

::: code-group

```shell [NPM]
npm install @proicons/svelte
```

```shell [Yarn]
yarn add @proicons/svelte
```

```shell [PNPM]
pnpm add @proicons/svelte
```

```shell [Bun]
bun add @proicons/svelte
```
:::
<!-- #endregion install-svelte -->
## Usage
ProIcons can be imported by the icon name in PascalCase, and may end in `Icon`. The icon `Add` can be imported using either `Add` or `AddIcon`.

```svelte
<script>
import { SearchIcon } from '@proicons/svelte'

</script>

<SearchIcon color="red" size={32} />
```

There are several ways to import an icon into your Svelte component. These are all the same:
```typescript
import { AddIcon } from '@proicons/svelte'
import { AddIcon } from '@proicons/svelte/icons'
import AddIcon from '@proicons/svelte/AddIcon'
```

Props from [`ProIconsOptions`](options#proiconsoptions) can be used to customize icons. These components get converted into `<svg>` elements with your configuration.

## `ProIcon` Component
This package also includes a generic `ProIcon` component allowing you to import icons by their name. This is equivalent to the [HTML API](html-api).

::: danger
Using the `<ProIcon>` component imports all icons and breaks tree-shaking, which can increase bundle size when using module bundlers such as Webpack or Rollup.
:::

```svelte
<script>
import { ProIcon } from '@proicons/svelte'

</script>

<ProIcon icon="Add Square" size={32} />

// Other forms are allowed
<ProIcon icon="AddSquare" size={32} />
<ProIcon icon="AddSquareIcon" size={32} />
<ProIcon icon="addSquare" size={32} />
<ProIcon icon="add-square" size={32} />
```

All customization attributes on individual icons are also available on the `ProIcon` component.