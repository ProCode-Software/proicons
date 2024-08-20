import getIconInfo from "./getIconInfo"
import tags from './configs/tags.json'
import icons from './configs/icons.json'
import { ProIconInfo } from "./interfaces"

/** Searches for icons with names or tags that contain `key` and returns them as `ProIconInfo`. */
function search(key: string): ProIconInfo[] {
    const iconsAsInfo = Object.keys(icons).map((icon) => {
        // Don't index the element
        const j = getIconInfo(icon)
        delete j.element
        return j
    })
    const filtered = iconsAsInfo.filter((icon) => JSON.stringify(icon).includes(key))

    return filtered
}

export default search