export const template = (moduleName, rawSvg, nodes) => {
    return `import { createIcon } from '../createIcon'
    
    /**
 * @preview ![Icon preview]()
 */
    const ${moduleName} = createIcon(${moduleName}, ${JSON.stringify(nodes)})`
}