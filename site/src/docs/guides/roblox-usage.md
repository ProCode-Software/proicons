---
title: Using ProIcons in Roblox
editLink: true
---

<script setup lang="ts">
import { data } from '../../.vitepress/data/fetchRobloxData.data'
</script>

# Using ProIcons in Roblox
ProIcons can easily be used in Roblox. All icons have been uploaded to Roblox and have gone through alpha bleeding via [Pixelfix](https://github.com/Corecii/Transparent-Pixel-Fix).

## Basics
A file with the image IDs of all icons is available at [icons/roblox.json](https://github.com/ProCode-Software/proicons/blob/main/icons/roblox.json) in the repository. This can be fetched and loaded in a Roblox script using Roblox's [HttpService](https://create.roblox.com/docs/reference/engine/classes/HttpService).

```luau
local HttpService = game:GetService('HttpService')
local iconsUrl = 'https://github.com/ProCode-Software/proicons/blob/main/icons/roblox.json'

-- Fetch JSON data and catch any errors
local success, data = pcall(function()
    return HttpService:JSONDecode(HttpService:GetAsync(iconsUrl))
end)
if success then
    print(data)
end
```
::: warning Important
For this script to work, you must enable HTTP requests in your game. You can do so by running the following code in the Command Bar in Roblox Studio:
```luau
game:GetService("HttpService").HttpEnabled = true
```
:::
Roblox documentation:
- [HttpService](https://create.roblox.com/docs/reference/engine/classes/HttpService)
- [HttpService:GetAsync()](https://create.roblox.com/docs/reference/engine/classes/HttpService#GetAsync)
- [HttpService:JSONDecode()](https://create.roblox.com/docs/reference/engine/classes/HttpService#JSONDecode)

### Format
The file is in the following format:
```json
{
    "exclude": ["..."],
    "assetPaths": {
        "Accessibility": "87125978665929",
        "Add": "91287573941495",
        "Add Circle": "115071695814939",
        // ...
    }
}
```

### Loading icons
To get the image ID for an icon, you can index the `assetPaths` object.
```luau
local icons = data.assetPaths

-- Get the asset id for 'Add' icon
local Add = icons.Add

-- Create an ImageLabel
local imageLabel = Instance.new('ImageLabel')
imageLabel.Image = `rbxassetid://{Add}`
imageLabel.Parent = gui -- Set this to your own GUI
```

### Index all available icons
```luau
for name, url in pairs(data) do
    local imageLabel = Instance.new('ImageLabel')
    imageLabel.Image = `rbxassetid://{url}`
    imageLabel.Name = name
    imageLabel.Parent = gui
end
```

## Notes
Icons are added and updated every release. All icons are uploaded in white, and the color can be changed using the `ImageColor3` property on `ImageLabel` or `ImageButton` elements.

## Excluded icons
Due to Roblox moderation policies, the following icons have not been uploaded:

<ul>
    <li v-for="item in data.exclude">{{ item }}</li>
</ul>