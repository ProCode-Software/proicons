import icons from './configs/icons.json';
import tags from './configs/tags.json';
import { ProIconInfo } from './interfaces';
const rename = require('../bin/rename');

/**
 * Returns information about an icon from the provided key.
 * Throws an error if the provided key does not match an icon name in Friendly Form, camelCase or kebab-case. Use the method `search` instead to return icons that contain a keyword inside its name or tags.
 * @param key The icon name in Friendly Form, camelCase or kebab-case. Throws an error if the provided key is invalid. Case-insensitive
 * @example The following keys are valid:
 * getIconInfo('Add Square')
 * getIconInfo('addSquare')
 * getIconInfo('add-square')
 */
function getIconInfo(key: string): ProIconInfo {
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
        throw new Error(`Invalid icon key '${key}': Icon not found`);
    }

    const friendlyName = Object.keys(tags).find((t) => {
        return rename.camelCase(t) == prop;
    });

    const domParser = new DOMParser();
    const parsed = domParser.parseFromString(icons[prop], 'image/svg+xml');

    const tagItem = tags[friendlyName]
    const info = new ProIconInfo(
        friendlyName, //friendly
        rename.kebabCase(friendlyName), //kebab
        prop, //camel
        parsed.querySelector('svg'), //svg
        tagItem.description?.split(',').map(m => m.trim()), //desc
        tagItem.category, //tags
    );
    return info;
}

export default getIconInfo