import _ic from '../../../icons/icons.json' with { type: 'json' }
import _lf from '../../../icons/icons.lock.json' with { type: 'json' }
import { camelCase, DeprecatedIcon, Icon, Lockfile, pascalCase } from '@proicons/shared'
import { LockfileIcon, IconsJSON } from '@proicons/shared'

export type Node = import('../createSvgNodes.ts').IconNode

export interface IconData {
    pascalName: string
    camelName: string
    friendlyName: string
    lockfileItem: LockfileIcon
    iconData: Icon
    deprecationData: DeprecatedIcon
    /** Base64 SVG data */
    rawSvgData: string
}

const lockfile: Lockfile = _lf
const icons: IconsJSON = _ic

/**
 * Gets information about an icon
 */
export function getData(moduleName: string) {
    const pascalName = moduleName.replace(/Icon$/, '')
    const friendlyName = Object.keys(icons).find(key => pascalCase(key) == pascalName)
    if (!friendlyName) throw new Error(`Icon ${friendlyName} not found`)
    const camelName = camelCase(friendlyName)

    const lockfileItem: LockfileIcon = lockfile.icons[friendlyName]
    const iconData: Icon = icons[friendlyName]
    const deprecationData: DeprecatedIcon | undefined =
        lockfile.deprecated?.[friendlyName]

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
        rawSvgData,
    }
}
