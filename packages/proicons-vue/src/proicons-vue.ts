import * as icons from './icons'
import ProIcon from './ProIcon.vue'

export {
    /** List of all available icons as components.
     *
     * Note: This will import all icons and breaks tree-shaking
     */
    icons,

    /**
     * Generic icon component that can be used to import icons by their name
     *
     * Note: This breaks tree-shaking
     * @example ```vue
     * <ProIcon icon="Add Square" />
     * ```
     */
    ProIcon
}

export * from './icons.ts'
