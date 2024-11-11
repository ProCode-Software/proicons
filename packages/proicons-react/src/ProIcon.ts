import * as React from 'react'
import * as icons from './icons'
import { ProIconsOptions } from './types'
import { kebabCase } from '../../../src/rename'

type IconEnum<T extends string> = T extends `${infer Base}Icon` ? Base : T

interface ProIconComponent extends ProIconsOptions {
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
    return Object.entries(icons).find(
        ([iconName, { displayName: friendlyName }]) => {
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
        }
    )?.[0]
}

export const ProIcon = React.forwardRef<SVGSVGElement, ProIconComponent>(
    ({ icon, ...props }, ref) => {
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
