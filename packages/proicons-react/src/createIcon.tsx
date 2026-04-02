import * as React from 'react'
import { kebabCase, kebabToCamelCase } from '@proicons/shared'
import { convertNodesWithConfig } from '@proicons/shared'
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

export type IconComponent = React.FunctionComponent<ProIconAttributes>

export function createIcon(
    {
        name,
        deprecated,
        alternative,
    }: { name: string; deprecated?: boolean; alternative?: string },
    nodes: IconNode[]
): IconComponent {
    const Icon: IconComponent = ({ ref, ...props }: ProIconAttributes) => {
        if (deprecated) {
            console.warn(`Icon ${name} is deprecated. Use ${alternative} instead.`)
        }
        return (
            <svg
                ref={ref}
                width={props?.size ?? 24}
                height={props?.size ?? 24}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                {...props}
                className={((props?.className ?? '') + ' proicon').trim()}
                data-proicon-id={kebabCase(name)}
            >
                {convertNodes(convertNodesWithConfig(nodes, props) as IconNode[])}
            </svg>
        )
    }
    Icon.displayName = name
    return Icon
}
