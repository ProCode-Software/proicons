import * as icons from './icons'
import { ProIcon } from './types';
import { camelCase, kebabCase, pascalCase } from './rename';
import iconList from './iconList';

/**
 * Returns information about an icon from the provided key.
 * Throws an error if the provided key does not match an icon name in Friendly Form, camelCase or kebab-case. Use the method `search` instead to return icons that contain a keyword inside its name or tags.
 * 
 * Note: This will import all icons and breaks tree-shaking
 * @param key The icon name in Friendly Form, camelCase or kebab-case. Throws an error if the provided key is invalid. Case-insensitive
 * @example The following keys are valid:
 * getIconInfo('Add Square')
 * getIconInfo('addSquare')
 * getIconInfo('add-square')
 */
function getIconInfo(key: string): ProIcon | undefined {
    const lowerName = key.toLowerCase()
    const iconName = Object.keys(icons).find(pascalName => {
        const lowerIconName = pascalName.replace(/Icon$/, '').toLowerCase()

        return (
            lowerIconName == lowerName ||
            lowerIconName + 'icon' == lowerName ||
            kebabCase(lowerIconName) == lowerName ||
            lowerIconName == pascalCase(lowerName)
        )
    })

    return icons[iconName]
}

export default getIconInfo