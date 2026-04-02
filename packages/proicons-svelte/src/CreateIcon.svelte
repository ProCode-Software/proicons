<script lang="ts">
import { onMount } from 'svelte'
import type { IconNode, ProIconAttributes } from './types'
import { convertNodesWithConfig, kebabCase } from './utils'

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

const options = $derived({
    color,
    strokeWidth,
    outline,
    strokeCaps,
    strokeJoin,
    cornerRadius,
    size,
})

onMount(() => {
    if (icon.deprecated) {
        console.warn(`Icon ${icon.name} is deprecated. Use ${icon.alternative} instead.`)
    }
})
</script>

<svg
    width={size ?? 24}
    height={size ?? 24}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    class={!props?.class
        ? 'proicon'
        : typeof props.class == 'string'
          ? `proicon ${props.class}`
          : ['proicon', props.class]}
    data-proicon-id={kebabCase(icon.name)}
    {...props}
>
    {#snippet node(tag: string, p: IconNode[1], children: IconNode[])}
        <svelte:element this={tag} {...p}>
            {#each children as [tag2, p2, children2]}
                {@render node(tag2, p2, children2)}
            {/each}
        </svelte:element>
    {/snippet}
    
    {#each convertNodesWithConfig(nodes, options) as [tag, p, children]}
        <svelte:element this={tag} {...p}>
            {#each children as [tag2, p2, children2]}
                {@render node(tag2, p2, children2)}
            {/each}
        </svelte:element>
    {/each}
</svg>
