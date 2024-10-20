import icons from '../icons/icons.json';
import { ProIconInfo } from './interfaces';
import { camelCase, kebabCase } from './rename';

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
    const isKebab = (t: string) => kebabCase(t.toLowerCase()) == kebabCase(key.toLowerCase());
    const isCamel = isFriendly

    if (Object.keys(icons).some(isFriendly)) {
        prop = camelCase(Object.keys(icons).find(isFriendly));

    } else if (Object.keys(icons).some(isKebab)) {
        prop = camelCase(Object.keys(icons).find(isKebab));

    } else if (Object.keys(icons).some(isCamel)) {
        // @ts-ignore
        prop = Object.keys(icons).find(isCamel);

    } else {
        throw new Error(`Invalid icon key '${key}': Icon not found`);
    }

    const friendlyName = Object.keys(icons).find((t) => {
        return camelCase(t) == prop;
    });

    const domParser = new DOMParser();
    const parsed = domParser.parseFromString(icons[friendlyName].icon, 'image/svg+xml');

    const tagItem = icons[friendlyName]

    const info = new ProIconInfo(
        friendlyName,
        kebabCase(friendlyName),
        prop,
        parsed.querySelector('svg'),
        tagItem.description?.split(',').map(m => m.trim()),
        tagItem.category,
    );
    return info;
}

export default getIconInfo