import { ProIconInfo, ProIconsOptions } from './interfaces';

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
): ProIconInfo {
    if (deprecated) {
        console.warn(
            `The icon ${name} is deprecated and will be removed in a future version. Use ${alternativeIcon} instead.`,
        );
    }
    return new ProIconInfo(name, tags, category, nodes);
}