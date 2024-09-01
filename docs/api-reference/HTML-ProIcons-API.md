ProIcons are designed to be easy to use inside of HTML. Similar to [Feather Icons](https://github.com/feathericons/feather), ProIcons can be inserted through elements with a `proicon` attribute.

To insert an `Add` icon inside HTML:

```html
<i proicon="add"></icon>
```

Before you can use this functionality, you will need to install the ProIcons API as shown below.

## Setup

### Method 1: Use a CDN provider

The easiest way to install ProIcons is via a CDN provider such as [UNPKG](https://unpkg.com)

```html
<script src="https://unpkg.com/proicons"></script>
```

### Method 2: Install locally

If you want to use ProIcons locally, you can also install ProIcons via [NPM](https://npmjs.com/package/proicons).

```
npm install proicons
```

Then you can import ProIcons inside your HTML file:

```html
<script src="path/to/proicons/dist/proicons.js"
```

Replace `path/to/` with the actual path to your `node_modules` folder (relative to the HTML file).

## Usage

As mentioned earlier, ProIcons can be added via the `proicon` attribute. Set the attribute value to the name of the icon you want to insert. (You can use any supported case)

To insert an `Add` icon inside HTML:

```html
<i proicon="add"></icon>
```

> [!TIP]
> The `i` element isn't mandatory, though the `proicon` attribute is, unless you [customize](./Configuration) the configuration.

Next, add a script to replace these elements.

```html
<script>
    proicons.replace();
</script>
```

`proicons.replace()` replaces every element with a `proicon` attribute with their respective icon. It will replace the actual element (in the case shown above `i`) if it doesn't have children, or it will insert the icon inside it as the first element.

## Attributes

ProIcons also can be customized via attributes.

```html
<i proicon="add" color="red"></i>
```
All of the available HTML attributes are shown below:

<table>
    <tr>
        <th>Attribute</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>color</code></td>
        <td>Color</td>
        <td>Determines the color of the icon</td>
    </tr>
    <tr>
        <td><code>stroke-width</code></td>
        <td>Number</td>
        <td>Defines the thickness of the icon's stroke</td>
    </tr>
    <tr>
        <td><code>join</code></td>
        <td><code>round</code> | <code>miter</code> | <code>bevel</code></td>
        <td>Defines the shape to be used for stroke joins.</td>
    </tr>
    <tr>
        <td><code>caps</code></td>
        <td><code>round</code> | <code>square</code> | <code>butt</code></td>
        <td>Defines the shape to be used for stroke caps.</td>
    </tr>
    <tr>
        <td><code>corner-radius</code></td>
        <td>Number</td>
        <td>Determines the corner radius of the icon. May not work with all icons.</td>
    </tr>
    <tr>
        <td><code>outline</code></td>
        <td>Boolean</td>
        <td>Determines whether to add additional strokes to filled SVG elements.</td>
    </tr>
</table>

## See also
- [ProIcons Configuration](./Configuration)
- [JavaScript ProIcons API](./JavaScript-ProIcons-API)
- [NPM Package](https://npmjs.com/package/proicons)