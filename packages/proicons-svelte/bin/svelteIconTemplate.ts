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
<!--
@component ${friendlyName}
@description ${iconData.description}
@preview ![Icon preview](data:image/svg+xml;base64,${rawSvgData})
@added v${lockfileItem.added}${lockfileItem.updated ? `\n * @updated v${lockfileItem.updated}` : ''}${deprecationData ? `\n * @deprecated Use ${deprecationData.alternative} instead` : ''}
-->
<script>
import CreateIcon from '../CreateIcon.svelte'

const ${moduleName} = ${JSON.stringify(iconInfo)}
const nodes = ${JSON.stringify(nodes)}
const props = $props()

</script>

<CreateIcon {...props} icon={${moduleName}} nodes={nodes} />
`.trim()
}
