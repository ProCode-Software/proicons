import getIconInfo from "./getIconInfo"
import * as icons from './icons'

import { ProIconInfo } from "./types"

/** Searches for icons with names or tags that contain `key` and returns them as `ProIconInfo`. */
function search(query: string): ProIconInfo[] {
    const mappedIcons = Object.values(icons)

    const filtered = mappedIcons.filter(item => {
        return Object.entries(item).some(([key, iconValue]) => {
            if (key == 'element') return

            return Array.isArray(iconValue) ?
                iconValue.some(tag => tag.toLowerCase()
                    .includes(query.toLowerCase()))
                : iconValue.toLowerCase()
                    .includes(query.toLowerCase())
        })
    })

    return filtered
}

export default search