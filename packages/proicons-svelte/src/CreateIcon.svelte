<script lang="ts">
import type { IconNode, ProIconAttributes } from './types'
import { convertNodesWithConfig, kebabCase } from '@proicons/shared'

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
const customizedNodes = convertNodesWithConfig(nodes, customizationOptions)

// svelte-ignore non_reactive_update
let className: string | any[] = 'proicon'
if (props?.class) {
    if (typeof props.class == 'string') className += ` ${props.class}`
    else className = [className, props.class]
}
</script>

<svg
    width={size ?? 24}
    height={size ?? 24}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    class={className}
    data-proicon-id={kebabCase(name)}
    {...props}
>
    {#snippet node(tag, p, children)}
        <svelte:element this={tag} {...p}>
            {#each children as [tag2, p2, children2]}
                {@render node(tag2, p2, children2)}
            {/each}
        </svelte:element>
    {/snippet}
    {#each customizedNodes as [tag, p, children]}
        <svelte:element this={tag} {...p}>
            {#each children as [tag2, p2, children2]}
                {@render node(tag2, p2, children2)}
            {/each}
        </svelte:element>
    {/each}
</svg>
