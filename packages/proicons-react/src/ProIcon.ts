import * as React from 'react'
import { kebabCase, pascalCase } from '../../../src/rename'
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
    const lowerName = name.toLowerCase()
    
    return (
        Object.keys(icons).find(pascalName => {
            const lowerIconName = pascalName.replace(/Icon$/, '').toLowerCase()

            return (
                lowerIconName == lowerName ||
                lowerIconName + 'icon' == lowerName ||
                kebabCase(lowerIconName) == lowerName ||
                lowerIconName == pascalCase(lowerName)
            )
        }) ?? undefined
    )
}

/**
 * Generic icon component allowing you to import icons by their name
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
