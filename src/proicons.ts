import icons from './configs/icons.json'
import tags from './configs/tags.json'
const rename = require('../bin/rename')

console.log(rename.camelCase('Hello World'))

class ProIconInfo {
    constructor(key: string) {

    }
}

function replace(rootElm: Element): void {

}

/**
 * 
 * @param key The icon name in camelCase or kebab-case, or an SVG
 */
function getIconInfo(key: string | Element) {
    if (typeof key !== 'string') key = key.outerHTML

    // tags: friendly
    // icons: camelCase - svg
}

export default {icons, replace, getIconInfo}