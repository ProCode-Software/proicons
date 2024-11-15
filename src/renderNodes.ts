import { type IconNode } from './createIcon';
import { type ProIconsOptions } from './types';

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
];

export function toNodes(elementString: string): IconNode[] {
    const element = new DOMParser()
        .parseFromString(elementString, 'image/svg+xml')
        .querySelector('svg')

    function renderNodeList(elm) {
        const nodeArray = []

        for (const child of elm.children) {
            const nodeItem = [
                child.tagName,

                child.attributes.length > 0 ? Object.fromEntries([...child.attributes].map(({ name, value }) => [name, value])) : {},

                child.children.length > 0 ? renderNodeList(child) : []
            ]
            nodeArray.push(nodeItem)
        }
        return nodeArray
    }
    return renderNodeList(element)
}

export function convertNodesWithConfig(nodes: IconNode[], options?: ProIconsOptions): IconNode[] {
    const defaultStroke = 1.5

    const attributeKey: Partial<Record<keyof ProIconsOptions, string[]>> = {
        // configKey, svgAttr
        color: ["stroke", "fill"],
        strokeWidth: ["stroke-width"],
        strokeCaps: ["stroke-linejoin"],
        strokeJoin: ["stroke-linecap"],
        cornerRadius: ["rx"],
        strokeFilledElements: undefined,
    }

    if (!options) return nodes

    return nodes.map(node => {
        const children = node[2]

        for (const [optionK, svgAttrs] of Object.entries(attributeKey)) {
            if (svgAttrs) {
                for (const s of svgAttrs) {
                    if (node[1][s] && options[optionK]) {
                        node[1][s] = options[optionK]
                    }
                }
            }
        }

        // Outlining
        if (
            !Object.hasOwn(node[1], 'stroke-width') &&
            Object.hasOwn(node[1], 'fill') &&
            node[1].fill != 'none' &&
            node[1].stroke != 'none' &&
            node[1]['stroke-width'] !== '0' &&
            (options?.strokeWidth ?? 0) > defaultStroke
        ) {
            node[1]['stroke-width'] = (options.strokeWidth - defaultStroke).toString()
            node[1].stroke = node[1].fill
            node[1]['stroke-linecap'] = options.strokeCaps ?? 'round'
            node[1]['stroke-linejoin'] = options.strokeJoin ?? 'round'
        }

        if (children.length) {
            node[2] = convertNodesWithConfig(children, options)
        }
        return node
    })
}

export function renderNodeWithRoot(nodes: IconNode[], rootNode: IconNode, options: ProIconsOptions): string {
    const root = structuredClone(rootNode)
    root[2].push(...nodes)

    if (options?.size) {
        root[1].width = options.size.toString()
        root[1].height = options.size.toString()
    }

    if (options?.attributes) {
        for (const [k, v] of Object.entries(options.attributes)) {
            root[1][k] = v
        }
    }

    return renderNodes([root])
}

export function renderNodes(nodes: IconNode[]): string {
    return nodes.map(([element, attrs, children]) => {
        const attrMap = Object.entries(attrs).map(([k, v]) => `${k}=${JSON.stringify(v)}`)

        return `<${element} ${attrMap.join(' ')}${children.length > 0 ? `>${renderNodes(children)}</${element}>` : ' />'}`
    }).join('')
}