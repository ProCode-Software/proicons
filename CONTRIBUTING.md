# Contributing Guidelines

Thanks for taking the time to contribute to ProIcons!
The following is a set of guidelines on contributing to ProIcons. Feel free to propose changes to the document via pull request.

## Pull requests

Please send in your changes as a pull request [here](https://github.com/ProCode-Software/proicons/pulls). Please make sure it is as descriptive as possible by explaining your changes in detail and showing images, if applicable.

If you're new to pull requests, check out this free [guide](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github).

## Adding an icon

You can request a new icon to be added to ProIcons via [discussions](https://github.com/ProCode-Software/proicons/discussions/categories/icon-requests).

Or, you can design your own icon and send it in as a pull request. Make sure you follow our [Design Guidelines](https://procode-software.github.io/proicons/docs/contributing/design-guidelines) when designing and naming your icon.

To keep things organized, **please include only one icon per pull request** unless the icons are related.

## Contributing to packages

The main ProIcons package is inside of the root `src` folder. Other packages are available in the `packages` folder. We use [NPM workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces) to manage and distribute multiple packages in a single monorepo.

## Contributing to documentation

The ProIcons documentation is built using [VitePress](https://vitepress.dev). The Markdown files are located in the [site/src/docs](https://github.com/ProCode-Software/proicons/tree/main/site/src/docs) folder.

## Development Guide

### Getting the repo

First, clone the repository:

```
git clone https://github.com/ProCode-Software/proicons.git
```

Then install dependencies

```
npm install
```

The command above will install dependencies for all packages. If you want to install dependencies for a specific package, use the flag `-w [package name]`.

### Adding an icon

The [Figma desktop app](https://www.figma.com/downloads/) is required for these steps. Please also make sure you have our [Build Icon List](https://github.com/ProCode-Software/proicons/tree/main/tools/BuildIconList) plugin cloned and imported into Figma.

1. Export your icon into the `proicons/in` folder and name it in Friendly Form. Make sure the icon is colored black and the strokes aren't outlined.
2. Run the Build Icon List plugin. Make sure the following criteria is met before running the plugin.

    - Make your icon into a component
    - Press `Ctrl + Alt + G` or `Option + Cmd + G` to put your component into another frame
    - Run the plugin on the newly created frame, which should already be selected.
        > [!NOTE]
        > We are working on making this workflow easier in the future

3. Copy the generated JSON and add it into the `src/configs/tags.json`
    > [!CAUTION]
    > Please make sure you are adding it into `tags.json` instead of `icons.json` or `icons.lock.json`. These files are auto-generated during build.
4. Run `npm run icons:build` to automatically add it into the `icons` folder as SVGs and PNGs and into the files mentioned above.

### Testing packages

To ensure your changes work, test your changes. This can be done by creating a separate test project and creating a symlink to your modified version using `npm link` as shown below:

```shell
# In your proicons folder
cd proicons

# It is important to build your package when testing!
npm run build

npm link

# Create a testing folder and initialize a package
mkdir test
cd test


# Inside your test folder
npm init

# Create a symbolic link to the proicons package
npm link proicons
```

Replace `proicons` in the `npm link` command with the package you want to test.
