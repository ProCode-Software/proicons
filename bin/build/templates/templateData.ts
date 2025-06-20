import icons from '../../../icons/icons.json' with { type: 'json' }
import lockfile from '../../../icons/icons.lock.json' with { type: 'json' }
import { camelCase, pascalCase } from '../../helpers/rename.ts'

export type Node = import("../createSvgNodes.ts").IconNode

/**
 * Gets information about an icon
 */
export function getData(moduleName: string) {
    const pascalName = moduleName.replace(/Icon$/, '')
    const friendlyName = Object.keys(icons).find(key => pascalCase(key) == pascalName)
    const camelName = camelCase(friendlyName)

    if (!friendlyName) {
        throw new Error(`Icon ${camelName} not found`)
    }

    const lockfileItem: (typeof lockfile.icons)[0] = lockfile.icons.find(
        d => d.name == friendlyName
    )

    const iconData: typeof icons.Add = icons[friendlyName]

    /** @type {{icon: string, version: string, alternative: string}?} */
    const deprecationData = lockfile.deprecated?.find(d => d.icon == friendlyName)

    const rawSvgData = Buffer.from(
        iconData.icon.trim().replace(/currentColor/g, '#ffffff')
    ).toString('base64')

    return {
        pascalName,
        camelName,
        friendlyName,
        lockfileItem,
        iconData,
        deprecationData,
        /** Base64 SVG data */
        rawSvgData,
    }
}
