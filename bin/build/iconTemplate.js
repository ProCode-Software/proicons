/**
 * @param {string} moduleName
 * @param {string} rawSvg
 * @param {import("./createSvgNodes").IconNode[]} nodes
 * @returns {string}
 */
export default (moduleName, rawSvg, nodes) => {
    return `
import { createIcon } from '../createIcon'
    
/**
 * @description Description
 * @preview ![Icon preview](data:image/svg+xml;base64,${btoa(rawSvg.trim())})
 */
const ${moduleName} = createIcon(${moduleName}, ${JSON.stringify(nodes)})

export default ${moduleName}
`
    .trim()
}