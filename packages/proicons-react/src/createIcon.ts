import * as React from 'react'
import { kebabCase, kebabToCamelCase } from '../../../src/rename'
import { convertNodesWithConfig } from '../../../src/renderNodes'
import { ProIconAttributes } from './types'

export type IconNode = [string, Record<string, string>, IconNode[]]

export const convertNodes = (n: IconNode[]) => {
    return !n.length
        ? null
        : n.map(([tag, attrs, children]) => {
              return React.createElement(
                  tag,
                  Object.fromEntries(
                      Object.entries(attrs).map(([k, v]) => [kebabToCamelCase(k), v])
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
) {
    if (deprecated) {
        console.warn(`Icon ${name} is deprecated. Use ${alternative} instead.`)
    }
    const Component = React.forwardRef<SVGSVGElement, ProIconAttributes>((props, ref) => {
        return React.createElement(
            'svg',
            {
                ref,
                width: props?.size ?? '24',
                height: props?.size ?? '24',
                xmlns: 'http://www.w3.org/2000/svg',
                viewBox: '0 0 24 24',
                fill: 'none',
                ...props,
                className: ((props?.className ?? '') + ' proicon').trim(),
                'data-proicon-id': kebabCase(name),
            },
            // @ts-ignore
            ...(convertNodes(convertNodesWithConfig(nodes, props)) ?? [])
        )
    })
    Component.displayName = name

    return Component
}
