import icons from '../icons/icons.json'
import rename from '../bin/rename'

const iconSvgElements = Object.fromEntries(
    Object.entries(icons)
        .map(entry => {
            return [
                rename.camelCase(entry[0]),
                entry[1].icon.trim()
            ]
        })
)

export default iconSvgElements