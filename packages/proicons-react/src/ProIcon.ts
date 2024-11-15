import * as React from 'react'
import { kebabCase } from '../../../src/rename'
import * as icons from './icons'
import { ProIconAttributes } from './types'

type IconEnum<T extends string> = T extends `${infer Base}Icon` ? Base : T

interface ProIconComponent extends ProIconAttributes {
    /**
     * The name of the icon in kebabCase, PascalCase, Friendly Form, or camelCase. Case-insensitive
     * @example These are allowed:
     * ```jsx
     * <ProIcon icon="add square" />
     * <ProIcon icon="home" />
     * <ProIcon icon="AddIcon" />
     * <ProIcon icon="bookmarkMultiple" />
     * ```
     */
    icon: IconEnum<keyof typeof icons> | (string & {})
}

export function getPascalName(name: string): string | undefined {
    return (
        Object.entries(icons).find(([iconName, { displayName: friendlyName }]) => {
            const lowerName = name.toLowerCase()
            const lowerIconName = iconName.slice(0, -4).toLowerCase()

            if (lowerIconName == lowerName || lowerIconName + 'icon' == lowerName) {
                // Camel or pascal case
                return true
            } else if (kebabCase(lowerIconName) == name) {
                // Kebab case
                return true
            } else if (friendlyName.toLowerCase() == lowerName) {
                // Friendly form
                return true
            }
        })?.[0] ?? undefined
    )
}

/**
 * Generic icon component allowing you to import icons by their names
 * 
 * Note: This breaks tree-shaking
 * @example ```jsx
 * <ProIcon icon="Add Square" />
 * ```
 */
export const ProIcon = React.forwardRef<SVGSVGElement, ProIconComponent>(
    ({ icon, ...props }, ref) => {
        if (!icon) {
            throw new TypeError("An 'icon' attribute is required.")
        }
        const pascalName = getPascalName(icon)

        if (!pascalName) {
            throw new Error(`Icon '${icon}' not found.`)
        }

        return React.createElement(icons[pascalName], {
            ref,
            ...props,
        })
    }
)
