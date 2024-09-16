import { ProIconInfo } from './interfaces';
/**
 * Returns information about an icon from the provided key.
 * Throws an error if the provided key does not match an icon name in Friendly Form, camelCase or kebab-case. Use the method `search` instead to return icons that contain a keyword inside its name or tags.
 * @param key The icon name in Friendly Form, camelCase or kebab-case. Throws an error if the provided key is invalid. Case-insensitive
 * @example The following keys are valid:
 * getIconInfo('Add Square')
 * getIconInfo('addSquare')
 * getIconInfo('add-square')
 */
declare function getIconInfo(key: string): ProIconInfo;
export default getIconInfo;
