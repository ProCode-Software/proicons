---
title: Design Guidelines
editLink: true
---
<script setup>
    import ThemedImage from '../../.vitepress/theme/components/ThemedImage.vue'
</script>
# Design Guidelines
Our icons are designed to be clean and modern icons. These guidelines show how icons are supposed to be designed for the ProIcons icon library.

## Designing icons
### Canvas
Each icon is designed on a 24px * 24px grid with a 2px padding, providing a 20px * 20px active area.

<div class="sym-img p-20 sh">
    <img src="/guidelines/canvas-1.png" width="240">
</div>

::: info Note
Icons shouldn't be larger than 20px * 20px. Some icons exceed this size, but this is rarely done. We will review icons that may need this.
:::

### Stroke
We use a 1.5px stroke for all of our icons. All strokes are centered with round line caps and joins.

<div class="sym-img p-20 sh">
    <img src="/guidelines/stroke-width.png" width="240">
</div>

### Shape
#### Size
Shapes can be up to 18.5px * 18.5px in size, converting to 20px * 20px (active area) when outlined.

<div class="sym-img p-20 sh">
    <img src="/guidelines/size-1.png" height="240">
</div>

#### Optical volume
In order to keep shapes balanced, squares should be 2px smaller than circles in size. Circles and other non-square shapes should go up to 18.5px in either width or height.

<div class="sym-img p-20 sh">
    <img src="/guidelines/shape-balance-1.png" height="240">
</div>

#### Corner radius
Corner radius is one of the key factors in ProIcons. Theses should be used carefully and when needed.

Larger shapes can use larger corner radius, between 2px and 4px.

Smaller shapes and acute angles can use smaller corner radius, up to 2px.

Even smaller shapes and lines may use a 0.6px corner radius or no corner radius.

## Naming
When exporting icons, please follow these naming conventions:

1. Icons should be named in Title Case.
<div class="sym-img p-20">
    <img src="/guidelines/naming-1.png">
</div>

2. Icons should be named by what they actually are, rather than what it's used for.
    * Shield is used instead of Security
<div class="sym-img p-20">
    <img src="/guidelines/naming-2.png">
</div>

3. Icons should be named using US English variants.
    * Color is used instead of Colour.
<div class="sym-img p-20">
    <img src="/guidelines/naming-3.png">
</div>

::: info Note
This is still acceptable in tags. You may also put both variants if you wish, which can help with [`proicons.search()`](../api-reference/javascript-api#search).
:::

4. Nouns in icons should go before adjectives.
    * Arrow Down is used instead of Down Arrow.
    * Person Multiple is used instead of Multiple People.
<div class="sym-img p-20">
    <img src="/guidelines/naming-4.png">
</div>