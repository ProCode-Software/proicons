import icons from '../icons/icons.json'
import { camelCase } from './rename'

const iconSvgElements = Object.fromEntries(
    Object.entries(icons)
        .map(entry => {
            return [
                camelCase(entry[0]),
                entry[1].icon.trim()
            ]
        })
)

export default iconSvgElements