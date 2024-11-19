---
title: React
---

# ProIcons for Roblox
Icon library with high-quality images for Roblox games. All icons are 120x120px in size and have gone through alpha bleeding.

[View on Wally](https://wally.run/package/procode-software/proicons) |
[GitHub](https://github.com/ProCode-Software/proicons/tree/main/packages/proicons-roblox)

## Installation
<!-- #region install-roblox -->
### Via Wally
1. Add to your dependencies
```toml
proicons = 'procode-software/proicons@*'
```
2. Install dependencies
```shell
wally install
```
### Roblox Package

### Via LoadString
If you want to always have the latest version available, you can import the script using `loadstring`:
```lua
local Icons = loadstring(game:GetService("HttpService"):GetAsync("https://github.com/ProCode-Software/proicons/blob/main/packages/proicons-roblox/src/ProIcons.luau", true))()
```
<!-- #endregion install-roblox -->

## Usage
All icons are inside a table with the icon's asset id and other metadata.

To import the Add Square icon into an `ImageLabel`:
```lua
-- Import the library
local Icons = require(path.to.ProIcons.Icons)

local ImageLabel = Instance.new('ImageLabel')

-- Set the icon
ImageLabel.Image = 'rbxassetid://'..Icons.AddSquare.id
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

## Unavailable Icons
Due to Roblox moderation, not all icons in the set have been included in the Roblox library. The removed icons include:
- All brand icons, except for Roblox
- Box Drag