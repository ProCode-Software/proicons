import icons from '../../../icons/icons.json' with { type: 'json' }
import lockfile from '../../../icons/icons.lock.json' with { type: 'json' }
import { camelCase, pascalToCamelCase } from "../../helpers/rename.js"

/** 
 * Gets information about an icon
 * @param {string} moduleName
*/
export function getData(moduleName) {
    const kebabName = moduleName.slice(0, -4)
    const camelName = pascalToCamelCase(kebabName)
    const friendlyName = Object.keys(icons).find(key => camelCase(key) == camelName)

    if (!friendlyName) {
        throw new Error(`Icon ${camelName} not found`)
    }

    /** @type {typeof lockfile.icons[0]} */
    const lockfileItem = lockfile.icons.find(d => d.name == friendlyName)

    /** @type {typeof icons.Add} */
    const iconData = icons[friendlyName]

    /** @type {{icon: string, version: string, alternative: string}?} */
    const deprecationData = lockfile.deprecated?.find(d => d.icon == friendlyName)

    const rawSvgData = Buffer.from(iconData.icon
        .trim()
        .replace(/currentColor/g, '#ffffff')
    ).toString('base64')

    return {
        kebabName,
        camelName,
        friendlyName,
        lockfileItem,
        iconData,
        deprecationData,
        /** Base64 SVG data */
        rawSvgData,
    }
}