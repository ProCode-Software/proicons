# Contributing Guidelines

Thanks for taking the time to contribute to ProIcons!
The following is a set of guidelines on contributing to ProIcons. Feel free to propose changes to the document via pull request.

## Pull requests

Please send in your changes as a pull request [here](https://github.com/ProCode-Software/proicons/pulls). Please make sure it is as descriptive as possible by explaining your changes in detail and showing images, if applicable.

If you're new to pull requests, check out this free [guide](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github).

## Adding an icon

You can request a new icon to be added to ProIcons via [discussions](https://github.com/ProCode-Software/proicons/discussions/categories/icon-requests).

Or, you can design your own icon and send it in as a pull request. See the [development guide](https://github.com/ProCode-Software/proicons/blob/main/CONTRIBUTING.md#development-guide) to learn how you can add your icon to the set. You can also modify an existing icon in the set.

To keep things organized, **please include only one icon per pull request** unless the icons are related.

## Contributing to packages

The main ProIcons package is inside of the root `src` folder. Other packages are available in the `packages` folder. We use [Bun workspaces](https://bun.com/docs/pm/workspaces) to manage and distribute multiple packages in a single monorepo.

## Contributing to documentation

The ProIcons documentation is built using [VitePress](https://vitepress.dev). The Markdown files are located in the [site/src/docs](https://github.com/ProCode-Software/proicons/tree/main/site/src/docs) folder.

## Development Guide

### Getting the repo

#### Prerequisites

- [Node.js](https://nodejs.org) 22+
- [Bun](https://bun.com)

First, clone the repository:

```
git clone https://github.com/ProCode-Software/proicons.git
```

Then install dependencies

```
bun install
```

The command above will install dependencies for all packages. If you want to install dependencies for a specific package, run `bun --filter [package] install`.

Note that you will need to install all dependencies if you want to build the icon set.

### Adding an icon

The [Figma desktop app](https://www.figma.com/downloads/) is recommended, along with our [Build Icon List](https://github.com/ProCode-Software/proicons/tree/main/tools/BuildIconList) plugin cloned and [imported](#installing-the-figma-plugin) into Figma.

Please follow our [design guidelines](https://procode-software.github.io/proicons/docs/design-guidelines) and [naming conventions](https://procode-software.github.io/proicons/docs/design-guidelines/naming) when creating your icon.

#### Installing the Figma plugin _(Recommended if using Figma)_

1. Make sure you have cloned the ProIcons repository
2. Select the dropdown in the title bar or right click in a file > _Plugins > Development > Import plugin from manifest..._
3. Upload the `manifest.json` file located in `proicons/tools/BuildIconList/`.

#### Using Build Icon List plugin in Figma

1. After designing your icon, make it a component by pressing `Ctrl + Alt + K` or `Cmd + Option + K`

2. In `Component configuration` in the sidebar, add a description

3. Run the Build Icon List plugin by right-clicking and selecting _Plugins > Development > Build Icon List_. A popup will show with your generated JSON.

> [!NOTE]
> You may see a warning saying `1 icon doesn't have a category` or similar. If you see this, replace `NO CATEGORY` in your JSON data with a category that is [already in the set](https://procode-software.github.io/proicons/icons) (case-sensitive).
>
> This can be avoided by putting your icon in a frame (`Ctrl + Alt + G`/`Cmd + Option + G`) (**Do not make this new frame into a component**) and naming it your category before running the plugin.

4. Paste the generated JSON into a new file at `proicons/in/in.json`

#### Using other software

1. Create a new file at `proicons/in/in.json` with the following content:

```jsonc
{
    "Icon Name": {
        "description": "Icon description",
        "category": "Icon category",
        "icon": "Paste your icon's escaped SVG code",
    },
    // ...other icons
}
```

#### Building the icon set

Run `pnpm run icons:build` in the `proicons` folder to create PNG and SVG files from your icons in `proicons/icons` and add them to `icons.json` and `icons.lock.json`

### Testing packages

To ensure your changes work, test your changes. This can be done by creating a separate test project and creating a symlink to your modified version using `npm link` as shown below:

```shell
# In your proicons folder
cd proicons

# Make sure to build your package when testing
pnpm run ci

bun link

# Create a testing folder and initialize a package
mkdir test
cd test


# Inside your test folder
npm init

# Create a symbolic link to the proicons package
npm link proicons
```

Replace `proicons` in the `npm link` command with the package you want to test.
