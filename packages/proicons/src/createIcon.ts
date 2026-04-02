import { ProIcon } from './types'

export type IconNode = [string, Record<string, string | number>, IconNode[]]

export interface IconData {
    name: string
    tags: string[]
    category: string
    deprecated?: boolean
    alternativeIcon?: string
}

export function createIcon(
    { name, tags, category, deprecated, alternativeIcon }: IconData,
    nodes: IconNode[]
): ProIcon {
    return new ProIcon(
        name,
        tags,
        category,
        nodes,
        deprecated ? { alternativeIcon } : undefined
    )
}
