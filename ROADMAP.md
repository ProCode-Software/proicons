# ProIcons Roadmap
Here are some things that are currently being planned for this project. Note that this list is subject to change and items can be added or removed.

## Website Redesign
Redesign the homepage, and possibly the rest of the website.

## Figma Plugin
**Available in preview:** https://github.com/ProCode-Software/proicons-figma

A Figma plugin that will allow you to add ProIcons into your design. It will also have the ability to automatically update ProIcons in your file.

The plugin source code is available in the [proicons-figma](https://github.com/ProCode-Software/proicons-figma) repository and will be published to Figma Community in the future.

## Roblox Plugin
> [!IMPORTANT]
> Due to Roblox API changes, new icons aren't being uploaded to Roblox.

**Source code:** https://github.com/ProCode-Software/ProIconsRoblox

~~A free and open-source plugin will be available to download for copying and adding icons into your game.~~

## ProIcons 5.0
Changes planned for the next major version of ProIcons. These are subject to change.

- A new package that includes all icon nodes will be published. This will be a dependency of all ProIcons packages to avoid copying the same icons when multiple packages are installed.
- New icon styles, including color.
- Codebase changes and rewrites.

### Breaking changes
- Packages will be published as ESM-only.
- JavaScript targets will be set to ES2020 or Baseline Widely Available. The current target for the `proicons` package is ES6.
