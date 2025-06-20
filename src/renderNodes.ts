import { type IconNode } from './createIcon'
import { type ProIconsOptions } from './types'

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
        const [_, props, children] = node

        for (const [optionK, svgAttrs] of Object.entries(attributeKey)) {
            for (const s of svgAttrs) {
                if (props[s] && options[optionK]) {
                    props[s] = options[optionK]
                }
            }
        }

        // Outlining
        if (
            !Object.hasOwn(props, 'stroke-width') &&
            Object.hasOwn(props, 'fill') &&
            props.fill != 'none' &&
            props.stroke != 'none' &&
            props['stroke-width'] !== '0' &&
            (options?.strokeWidth ?? 0) > defaultStroke
        ) {
            props['stroke-width'] = (options.strokeWidth - defaultStroke).toString()
            props.stroke = props.fill
            props['stroke-linecap'] = options.strokeCaps ?? 'round'
            props['stroke-linejoin'] = options.strokeJoin ?? 'round'
        }

        if (children.length) {
            node[2] = convertNodesWithConfig(children, options)
        }
        return node
    })
}

export function renderNodeWithRoot(
    nodes: IconNode[],
    rootNode: IconNode,
    options: ProIconsOptions
): string {
    const root = structuredClone(rootNode)
    const [_, props, children] = root
    children.push(...nodes)

    if (options?.size) {
        props.width = options.size.toString()
        props.height = options.size.toString()
    }

    if (options?.attributes) {
        for (const [k, v] of Object.entries(options.attributes)) {
            props[k] = v
        }
    }

    return renderNodes([root])
}

export function renderNodes(nodes: IconNode[]): string {
    return nodes
        .map(([element, attrs, children]) => {
            const attrMap = Object.entries(attrs).map(
                ([k, v]) => `${k}=${JSON.stringify(v)}`
            )
            return `<${element} ${attrMap.join(' ')}${children.length > 0 ? `>${renderNodes(children)}</${element}>` : ' />'}`
        })
        .join('')
}
