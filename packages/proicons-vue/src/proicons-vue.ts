import * as icons from './icons'
import ProIcon from './ProIcon.vue'

export {
    /** List of all available icons as components.
     *
     * [View the list of icons here](https://procode-software.github.io/proicons/icons)
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
     * [Documentation](https://procode-software.github.io/proicons/docs/vue#proicon-component)
     */
    ProIcon,
}

export * from './icons.ts'
