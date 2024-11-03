import icons from '../../../icons/icons.json' with { type: 'json' }
import lockfile from '../../../icons/icons.lock.json' with { type: 'json' }
import { camelCase, pascalToCamelCase } from "../../rename.js"

/**
 * @param {string} moduleName
 * @param {import("../createSvgNodes.js").IconNode[]} nodes
 * @returns {string}
 */
export default (moduleName, nodes) => {
    const realName = moduleName.slice(0, -4)
    const camelName = pascalToCamelCase(realName)
    const friendlyName = Object.keys(icons).find(key => camelCase(key) == camelName)

    if (!friendlyName) {
        throw new Error(`Icon ${camelName} not found`)
    }

    /** @type {typeof lockfile.icons[0]} */
    const lockfileItem = lockfile.icons.find(d => d.name == friendlyName)

    /** @type {typeof icons.Add} */
    const iconData = icons[friendlyName]

    /** @type {{icon: string, version: string, alternative: string}?} */
    const deprecationData = lockfile.deprecated?.find(d => d.icon == friendlyName)

    const rawSvgData = Buffer.from(iconData.icon
        .trim()
        .replace(/currentColor/g, '#ffffff')
    ).toString('base64')

    const iconInfo = {
        name: friendlyName,
        tags: iconData.description.split(', ').map(t => t.trim()),
        category: iconData.category,
        deprecated: !!deprecationData,
        alternativeIcon: deprecationData?.alternative ?? undefined
    }

    return `
import { createIcon } from '../createIcon'
    
/**
 * @description ${iconData.description}
 * @preview ![Icon preview](data:image/svg+xml;base64,${rawSvgData})
 * @added v${lockfileItem.added}${lockfileItem.updated ? `\n * @updated v${lockfileItem.updated}` : ''}${deprecationData ? `\n * @deprecated Use ${deprecationData.alternative} instead` : ''}
 */
const ${moduleName} = createIcon(${JSON.stringify(iconInfo)}, ${JSON.stringify(nodes)})

export default ${moduleName}
`.trim()
}