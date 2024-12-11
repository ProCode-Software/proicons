import categories from './categories'
import iconList from './iconList'
import * as icons from './icons'

export {
    /** List of all available icons as type `ProIcon`.
     * 
     * [View the list of icons here](https://procode-software.github.io/proicons/icons)
     * 
     * Note: This will import all icons and breaks tree-shaking
     */
    icons,
    /** List of all categories */
    categories,
    /** List of all icon names as strings
     * 
     * [View the list of icons here](https://procode-software.github.io/proicons/icons)
     */
    iconList
}

export { default as getIconInfo } from './getIconInfo'
export { default as replace } from './replace'
export { default as search } from './search'

export * from './icons'