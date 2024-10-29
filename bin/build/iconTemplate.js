/**
 * @param {string} moduleName
 * @param {string} rawSvg
 * @param {import("./createSvgNodes").IconNode[]} nodes
 * @returns {string}
 */
export default (moduleName, rawSvg, nodes) => {
    const rawSvgData = Buffer.from(rawSvg
        .trim()
        .replace(/currentColor/g, '#ffffff')
    ).toString('base64')

    return `
import { createIcon } from '../createIcon'
    
/**
 * @description Description
 * @preview ![Icon preview](data:image/svg+xml;base64,${rawSvgData})
 */
const ${moduleName} = createIcon(${moduleName}, ${JSON.stringify(nodes)})

export default ${moduleName}
`.trim()
}