// @ts-nocheck
import icons from './configs/icons.json';
import tags from './configs/tags.json';
const rename = require('../bin/rename');
class ProIconInfo {
    /**
     * 
     * @param name The name of the icon in Friendly Format
     * @param kebabCase The name of the icon in kebab-case
     * @param camelCase The name of the icon in camelCase
     * @param element The icon as an `SVGElement`. You can use the `outerHTML` property on this to return the icon as a string.
     * @param category The category of the icon.
     * @param tags An array of tags for the icon
     */
    constructor(
        name: string,
        kebabCase: string,
        camelCase: string,
        element: SVGElement,
        tags: string[],
        category: string
    ) {
        this.name = name;
        this.kebabCase = kebabCase;
        this.camelCase = camelCase;
        this.element = element;
        this.category = category;
        this.tags = tags;
    }
}

/**
 *
 * @param key The icon name in Friendly Format, camelCase or kebab-case. Throws an error if the provided key is invalid. Case-insensitive
 * @example getIconInfo('Add Square')
 * getIconInfo('addSquare')
 * getIconInfo('add-square')
 */
function getIconInfo(key: string) {
    // Camel case
    let prop: string;

    const isFriendly = (t: string) => t.toLowerCase() == key.toLowerCase();
    const isKebab = (t: string) => rename.kebabCase(t.toLowerCase()) == rename.kebabCase(key.toLowerCase());
    const isCamel = isFriendly

    if (Object.keys(tags).some(isFriendly)) {
        prop = rename.camelCase(Object.keys(tags).find(isFriendly));

    } else if (Object.keys(tags).some(isKebab)) {
        prop = rename.camelCase(Object.keys(tags).find(isKebab));

    } else if (Object.keys(icons).some(isCamel)) {
        // @ts-ignore
        prop = Object.keys(icons).find(isCamel);

    } else {
        throw new Error(`Invalid icon key ${getIconInfo}: Icon not found`);
    }

    const friendlyName = Object.keys(tags).find((t) => {
        return rename.camelCase(t) == prop;
    });

    const domParser = new DOMParser();
    const parsed = domParser.parseFromString(icons[prop], 'image/svg+xml');

    const info = new ProIconInfo(
        friendlyName, //name
        rename.kebabCase(friendlyName), //kebab
        prop, //camel
        parsed.querySelector('svg'), //svg
        tags[friendlyName].description.split(',').map(m => m.trim()), //desc
        tags[friendlyName].category, //tags
    );
    return info;
}

function replace(rootElm: Element, config): void { }

export default { icons, replace, getIconInfo };