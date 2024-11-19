# ProIcons for Roblox

<p>
    <a href="https://github.com/ProCode-Software/proicons/releases">
        <img src="https://img.shields.io/github/v/release/ProCode-Software/proicons?style=for-the-badge&color=rgb(172, 229, 251)"
            alt="Version">
    </a>
    <a href="">
        <img src="https://img.shields.io/github/stars/ProCode-Software/proicons?style=for-the-badge&color=rgb(255, 215, 142)"
            alt="Stars">
    </a>
    <a href="https://github.com/ProCode-Software/proicons/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/ProCode-Software/proicons?style=for-the-badge&color=rgb(252, 197, 232)"
            alt="License">
    </a>
</p>

<img src="https://raw.githubusercontent.com/ProCode-Software/proicons/main/.github/images/github-cover-roblox_light.png#gh-light-mode-only">
<img src="https://raw.githubusercontent.com/ProCode-Software/proicons/main/.github/images/github-cover-roblox_dark.png#gh-dark-mode-only">

<p align="center">
<br>
An implementation of the <a href="https://github.com/ProCode-Software/proicons" target="_blank">ProIcons</a> icon library for Roblox games.
<br>
<a href="https://procode-software.github.io/proicons/icons">Browse icons</a> | 
<a href="https://procode-software.github.io/proicons/docs/packages/roblox">Documentation</a> | 
<a href="https://github.com/ProCode-Software/proicons/tree/main/packages/proicons-roblox">GitHub</a> | 
<a href="https://wally.run/package/procode-software/proicons">Download on Wally</a>
</p>

## Features
- All icons are 120x120px and have gone through alpha blending via Pixelfix

**[Read the full documentation here](https://procode-software.github.io/proicons/docs/packages/roblox)**

## Installation
### Via [Wally](https://wally.run)
1. Add to your dependencies
```toml
proicons = "procode-software/proicons@*"
```
2. Install dependencies
```shell
wally install
```

### Via LoadString
If you want to always have the latest version available, you can import the script using `loadstring`:
```lua
local Icons = loadstring(game:GetService("HttpService"):GetAsync("https://github.com/ProCode-Software/proicons/blob/main/packages/proicons-roblox/src/ProIcons.luau", true))()
```

## Usage
All icons are inside a table with the icon's asset id and other metadata.

To import the Add Square icon into an `ImageLabel`:
```lua
-- Import the library
local ProIcons = require(path.to.ProIcons.ProIcons)

local ImageLabel = Instance.new('ImageLabel')

-- Set the icon
ImageLabel.Image = 'rbxassetid://'..ProIcons.AddSquare.id
```
Replace `path.to.` with the path of your library. If you installed the library via Wally, this may be `game.ReplicatedStorage`.

## Properties
All icons are in the following format:
```lua
{
    AddSquare = {
        id = 97666464232500, -- Image id
        category = "Actions",
        tags = { "Add Box", "Plus" }
    },
    -- ... other icons
}
```

- **id:** (`string`) Roblox asset id for the icon
- **category:** (`string`) The category of the icon. View the list of categories [here](https://github.com/ProCode-Software/proicons/blob/main/src/categories.ts).
- **tags:** (`{string}?`) The tags of the icon

## Removed icons
Due to Roblox moderation, not all icons in the set are available. These icons have been removed from the Roblox package:
- All brand icons, except Roblox
- Box Drag

If any other icon is not working, please create an issue.

## Contributing
For more info on how to contribute, please see our [contributing guide](https://github.com/ProCode-Software/proicons/blob/main/CONTRIBUTING.md).