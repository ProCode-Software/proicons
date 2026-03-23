import { getPascalName } from '@proicons/shared'
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
     * [Documentation](https://procode-software.github.io/proicons/docs/react#proicon-component)
     */
    icon: IconEnum<keyof typeof icons> | (string & {})
}


/**
 * Generic icon component allowing you to import icons by their name
 *
 * Note: This breaks tree-shaking
 * @example ```jsx
 * <ProIcon icon="Add Square" />
 * ```
 */
export function ProIcon({ icon, ...props }: ProIconComponent) {
    if (!icon) throw new TypeError("An 'icon' attribute is required.")

    const pascalName = getPascalName(icons, icon)
    if (!pascalName) throw new Error(`Icon '${icon}' not found.`)

    const Icon = icons[pascalName]
    return <Icon {...props} />
}
