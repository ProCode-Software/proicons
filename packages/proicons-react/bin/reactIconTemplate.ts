import { getData, type Node } from '../../../bin/build/templates/templateData.ts'

export default (moduleName: string, nodes: Node[]): string => {
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
        alternative: deprecationData?.alternative ?? undefined,
    }

    return `
import { createIcon, type IconComponent } from '../createIcon'
    
/**
 * @description ${iconData.description}
 * @preview ![Icon preview](data:image/svg+xml;base64,${rawSvgData})
 * @added v${lockfileItem.added}${lockfileItem.updated ? `\n * @updated v${lockfileItem.updated}` : ''}${deprecationData ? `\n * @deprecated Use ${deprecationData.alternative} instead` : ''}
 */
export const ${moduleName}: IconComponent = createIcon(${JSON.stringify(iconInfo)}, ${JSON.stringify(nodes)})
`.trim()
}
