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
<script>
import CreateIcon from '../CreateIcon.svelte'

const ${moduleName} = ${JSON.stringify(iconInfo)}
const nodes = ${JSON.stringify(nodes)}
const props = $props()
    
/**
 * @description ${iconData.description}
 * @preview ![Icon preview](data:image/svg+xml;base64,${rawSvgData})
 * @added v${lockfileItem.added}${lockfileItem.updated ? `\n * @updated v${lockfileItem.updated}` : ''}${deprecationData ? `\n * @deprecated Use ${deprecationData.alternative} instead` : ''}
 */
</script>

<CreateIcon {...props} icon={${moduleName}} nodes={nodes} />
`.trim()
}