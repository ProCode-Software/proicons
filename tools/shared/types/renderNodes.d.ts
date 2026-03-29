import type { SharedProIconsOptions as ProIconsOptions } from './shared.ts';
export type IconNode = [string, Record<string, string | number>, IconNode[]];
export declare const rootNode: IconNode;
export declare function convertNodesWithConfig(nodes: IconNode[], options?: ProIconsOptions): IconNode[];
export declare function renderNodeWithRoot(nodes: IconNode[], [rootTag, rootProps, rootChildren]: IconNode, options: ProIconsOptions): string;
export declare function renderNodes(nodes: IconNode[]): string;
