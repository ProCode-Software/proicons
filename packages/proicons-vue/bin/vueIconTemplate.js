import { getData } from "../../../bin/build/templates/templateData.js";

export default (moduleName, nodes) => {
    const {
        camelName,
        deprecationData,
        friendlyName,
        iconData,
        lockfileItem,
        rawSvgData,
        pascalName,
    } = getData(moduleName)

    const iconInfo = {
        name: friendlyName,
        deprecated: !!deprecationData,
        alternativeIcon: deprecationData?.alternative ?? undefined,
    }

    return `
import { createIcon } from '../createIcon'
    
/**
 * @description ${iconData.description}
 * @preview ![Icon preview](data:image/svg+xml;base64,${rawSvgData})
 * @added v${lockfileItem.added}${lockfileItem.updated ? `\n * @updated v${lockfileItem.updated}` : ''}${deprecationData ? `\n * @deprecated Use ${deprecationData.alternative} instead` : ''}
 */
const ${moduleName} = createIcon(${JSON.stringify(iconInfo)}, ${JSON.stringify(nodes)})

export { ${moduleName} }
`.trim()
}