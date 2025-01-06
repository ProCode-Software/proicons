---
title: Using ProIcons in Roblox
editLink: true
---

<script setup lang="ts">
// import { data } from '../../.vitepress/data/fetchRobloxData.data'
</script>

# Using ProIcons in Roblox
ProIcons can easily be used in Roblox. All icons have been uploaded to Roblox and have gone through alpha bleeding via [Pixelfix](https://github.com/Corecii/Transparent-Pixel-Fix).

## Basics
A file with the asset IDs of all icons is available at [icons/roblox.json](https://github.com/ProCode-Software/proicons/blob/main/icons/roblox.json) in the repository. This can be fetched and loaded in a Roblox script using Roblox's [HttpService](https://create.roblox.com/docs/reference/engine/classes/HttpService).

```luau
local HttpService = game:GetService('HttpService')
local iconsUrl = 'https://github.com/ProCode-Software/proicons/blob/main/icons/roblox.json'

-- Fetch JSON data and catch any errors
local err, data = pcall(function()
    return HttpService:JSONDecode(HttpService:GetAsync(iconsUrl))
end)
if err then
    error('Failed to fetch icons')
end
     
print(data) -- Print data if successful
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

The file is in the following format:
```json
{
    "exclude": [...],
    "asset_paths": {
        "Add Rhombus": "135021095926333",
        "Add Square": "97666464232500",
        "Add Square Multiple": "85422256562940",
        // ...
    }
}
```

## Excluded icons
Due to Roblox icons, the following icons have not been uploaded:

<!-- <ul>
    <li v-for="item in data.exclude">{{ item }}</li>
</ul> -->