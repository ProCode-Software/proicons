<script lang="ts">
import { convertNodesWithConfig, renderNodeWithRoot } from './utils'
import { kebabCase } from './utils'
import type { ProIconAttributes } from './types'

type IconNode = [string, Record<string, string>, IconNode[]]
type Props = ProIconAttributes & {
    icon: {
        name: string
        deprecated: boolean
        alternative?: string
    }
    nodes: IconNode[]
}

const {
    icon,
    nodes,
    color,
    strokeWidth,
    outline,
    strokeCaps,
    strokeJoin,
    cornerRadius,
    size,
    ...props
}: Props = $props()
const { name } = icon

const customizationOptions = {
    color,
    strokeWidth,
    outline,
    strokeCaps,
    strokeJoin,
    cornerRadius,
    size,
}

const rootNode: IconNode = [
    'svg',
    {
        width: size ?? 24,
        height: size ?? 24,
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        class: ['proicon', props?.class ?? ''].join(''),
        'data-proicon-id': kebabCase(name),
        ...props,
    },
    [],
]

const iconHtml = renderNodeWithRoot(
    convertNodesWithConfig(nodes, customizationOptions),
    rootNode,
    customizationOptions
)
</script>

{@html iconHtml}