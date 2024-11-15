import * as icons from './icons'
import ProIcon from './ProIcon.vue'

export {
    /** List of all available icons as components.
     *
     * Note: This will import all icons and breaks tree-shaking
     */
    icons,

    /**
     * Generic icon component allowing you to import icons by their names
     *
     * Note: This breaks tree-shaking
     * @example ```vue
     * <ProIcon icon="Add Square" />
     * ```
     */
    ProIcon
}

export * from './icons.ts'
