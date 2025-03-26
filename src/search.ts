import * as icons from './icons'
import { ProIcon } from './types'

/**
 * Searches for icons with names or tags that contain `key` and returns them as `ProIcon`.
 *
 * Note: This will import all icons and breaks tree-shaking.
 *
 * @param query - The query to search for. Can be a name in any case or a tag.
 * @returns An array of `ProIcon`s that match the query.
 *
 * [Documentation](https://procode-software.github.io/proicons/docs/javascript-api#search)
 */
function search(query: string): ProIcon[] {
    if (!query) throw new TypeError('A query is required')
    query = query.toString().toLowerCase()

    const mappedIcons = Object.values(icons) as ProIcon[]

    const filtered = mappedIcons.filter((item, i) => {
        return Object.entries(item).some(
            ([key, value]: [keyof ProIcon, any]) => {
                if ((!Array.isArray(value) && typeof value != 'string') || key == 'raw')
                    return

                return Array.isArray(value)
                    ? value.some(tag => tag.toLowerCase().includes(query))
                    : value.toLowerCase().includes(query)
            }
        ) && mappedIcons.indexOf(item) === i
    })

    return filtered
}

export default search
