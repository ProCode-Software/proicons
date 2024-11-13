import { type FunctionalComponent, h } from 'vue'
import { kebabCase, kebabToPascalCase, pascalToCamelCase } from '../../../src/rename'
import { convertNodesWithConfig } from '../../../src/renderNodes'
import { type ProIconAttributes } from './types'

export type IconNode = [string, Record<string, string>, IconNode[]]

export const convertNodes = (n: IconNode[]) => {
    return !n.length
        ? []
        : n.map(([tag, attrs, children]) => {
            return h(
                tag,
                Object.fromEntries(
                    Object.entries(attrs).map(([k, v]) => [
                        pascalToCamelCase(kebabToPascalCase(k)),
                        v,
                    ])
                ),
                convertNodes(children)
            )
        })
}

export function createIcon(
    {
        name,
        deprecated,
        alternative,
    }: { name: string; deprecated?: boolean; alternative?: string },
    nodes: IconNode[]
): FunctionalComponent<ProIconAttributes> {
    if (deprecated) {
        console.warn(`Icon ${name} is deprecated. Use ${alternative} instead.`)
    }

    return (props, { slots }) => {
        return h(
            'svg',
            {
                width: props?.size ?? 24,
                height: props?.size ?? 24,
                xmlns: 'http://www.w3.org/2000/svg',
                viewBox: '0 0 24 24',
                fill: 'none',
                class: ['proicon', props.class].flat(),
                'data-proicon-id': kebabCase(name),
                ...props,
            },
            [
                // @ts-ignore
                ...(convertNodes(convertNodesWithConfig(nodes, props)) ?? []),
                ...(slots.default ? slots.default() : [])
            ]
        )
    }
}
