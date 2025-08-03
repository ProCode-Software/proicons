import { type FunctionalComponent, h } from 'vue'
import { kebabCase } from './rename'
import { convertNodesWithConfig } from './renderNodes'
import { type ProIconAttributes } from './types'

export type IconNode = [string, Record<string, string>, IconNode[]]

export const convertNodes = (n: IconNode[]) => {
    return !n.length
        ? []
        : n.map(([tag, attrs, children]) => {
              return h(tag, attrs, convertNodes(children))
          })
}

type CreateAttributes = { name: string; deprecated?: boolean; alternative?: string }

export function createIcon(
    { name, deprecated, alternative }: CreateAttributes,
    nodes: IconNode[]
): FunctionalComponent<ProIconAttributes> {
    if (deprecated) {
        console.warn(`Icon ${name} is deprecated. Use ${alternative} instead.`)
    }

    return props => {
        return h(
            'svg',
            {
                width: props?.size ?? 24,
                height: props?.size ?? 24,
                xmlns: 'http://www.w3.org/2000/svg',
                viewBox: '0 0 24 24',
                fill: 'none',
                class: ['proicon', props.class],
                'data-proicon-id': kebabCase(name),
                ...props,
            },
            [
                // @ts-ignore
                ...(convertNodes(convertNodesWithConfig(nodes, props)) ?? []),
            ]
        )
    }
}
