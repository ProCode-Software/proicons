import type { SharedProIconsOptions as ProIconsOptions } from './shared.ts'

export type IconNode = [string, Record<string, string | number>, IconNode[]]

export const rootNode: IconNode = [
    'svg',
    {
        width: '24',
        height: '24',
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
    },
    [],
]

export function convertNodesWithConfig(
    nodes: IconNode[],
    options?: ProIconsOptions
): IconNode[] {
    const defaultStroke = 1.5

    const attributeKey: Partial<Record<keyof ProIconsOptions, string[]>> = {
        // configKey, svgAttr
        color: ['stroke', 'fill'],
        strokeWidth: ['stroke-width'],
        strokeCaps: ['stroke-linejoin'],
        strokeJoin: ['stroke-linecap'],
        cornerRadius: ['rx'],
    }

    if (!options) return nodes

    return nodes.map(node => {
        // Copy each node
        const [tag, ogProps, ogChildren] = node
        const props = { ...ogProps }

        for (const optionK in attributeKey)
            for (const s of attributeKey[optionK])
                if (props[s] && options[optionK]) props[s] = options[optionK]

        // Outlining
        if (
            props.fill != undefined &&
            props.fill != 'none' &&
            props.stroke != undefined &&
            props.stroke != 'none' &&
            (options?.strokeWidth ?? defaultStroke) > defaultStroke
        ) {
            props['stroke-width'] = (options.strokeWidth! - defaultStroke).toString()
            props.stroke = props.fill
            props['stroke-linecap'] = options.strokeCaps ?? 'round'
            props['stroke-linejoin'] = options.strokeJoin ?? 'round'
        }
        const children = ogChildren.length
            ? convertNodesWithConfig(ogChildren, options)
            : ogChildren // []
        // New node with customized props
        return [tag, props, children] as IconNode
    })
}

export function renderNodeWithRoot(
    nodes: IconNode[],
    [rootTag, rootProps, rootChildren]: IconNode,
    options?: ProIconsOptions
): string {
    const size = options?.size?.toString() ?? rootProps.width.toString()
    const root: IconNode = [
        rootTag,
        {
            ...rootProps,
            width: size,
            height: size,
            ...options?.attributes,
        },
        [...rootChildren, ...nodes],
    ]
    return renderNodes([root])
}

export function renderNodes(nodes: IconNode[]): string {
    return nodes
        .map(([element, attrs, children]) => {
            const attrMap = Object.entries(attrs).map(
                ([k, v]) => `${k}=${JSON.stringify(v)}`
            )
            return `<${element} ${attrMap.join(' ')}>${children.length > 0 ? renderNodes(children) : ''}</${element}>`
        })
        .join('')
}
