# Build Icon List

This plugin is used to create a configuration JSON with the icon descriptions and categories inside of Figma. **This is not the ProIcons plugin**.

## Prerequisites

- Node.js
- Figma desktop app (Get it at https://www.figma.com/downloads/)

## Building

1. Run `npm install` to install dependencies
2. Inside Figma, right-click anywhere in a file and go to _Plugins > Development > Import from manifest_.
3. Upload the `manifest.json` file from this repository

## How to use

1. Select a **frame** containing your icons as **components**. If this criteria is not met, this plugin won't work, but you can modify [`code.ts`](/BuildIconList/code.ts) to meet the needs of your workflow.
2. Run the plugin
3. If successful, a plugin window will show with your JSON, formatted in the way shown below:

```json
{
    "Add": {
        "description": "Plus, Create, New, Addition",
        "category": "Actions"
    }
}
```
