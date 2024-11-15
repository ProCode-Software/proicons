import * as icons from './icons'

import { ProIcon } from './types'

/**
 * Searches for icons with names or tags that contain `key` and returns them as `ProIcon`.
 *
 * Note: This will import all icons and breaks tree-shaking
 */
function search(query: string): ProIcon[] {
    const mappedIcons = Object.values(icons) as ProIcon[]

    const filtered = mappedIcons.filter(item => {
        return Object.entries(item).some(
            ([key, value]: [keyof ProIcon, string | string[]]) => {
                if (
                    (!Array.isArray(value) && typeof value != 'string') ||
                    key == 'raw'
                )
                    return

                return Array.isArray(value)
                    ? value.some(tag =>
                          tag.toLowerCase().includes(query.toLowerCase())
                      )
                    : value.toLowerCase().includes(query.toLowerCase())
            }
        )
    })

    return filtered
}

export default search
