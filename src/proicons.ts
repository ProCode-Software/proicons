import categories from './categories'
import iconList from './iconList'
import * as icons from './icons'

export {
    /** List of all available icons as type `ProIcon`.
     * 
     * Note: This will import all icons and breaks tree-shaking
     */
    icons,
    /** List of all categories */
    categories,
    /** List of all icon names as strings */
    iconList
}

export { default as getIconInfo } from './getIconInfo'
export { default as replace } from './replace'
export { default as search } from './search'

export * from './icons'