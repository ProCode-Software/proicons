import { getPascalName } from '@proicons/shared'
import * as icons from './icons'
import { ProIcon } from './types'

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
export function getIconInfo(key: string): ProIcon | undefined {
    const iconName = getPascalName(icons, key)
    if (!iconName) return undefined
    return icons[iconName as keyof typeof icons]
}
