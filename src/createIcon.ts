import { ProIcon } from './types';

export type IconNode = [string, Record<string, string>, IconNode[]];

export interface IconData {
    name: string;
    tags: string[];
    category: string;
    deprecated?: boolean;
    alternativeIcon?: string;
}

export function createIcon(
    { name, tags, category, deprecated, alternativeIcon }: IconData,
    nodes: IconNode[],
): ProIcon {
    if (deprecated) {
        console.warn(
            `The icon ${name} is deprecated and will be removed in a future version. Use ${alternativeIcon} instead.`,
        );
    }
    return new ProIcon(name, tags, category, nodes);
}