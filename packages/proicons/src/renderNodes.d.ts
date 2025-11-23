import { type IconNode } from './createIcon';
import { type ProIconsOptions } from './types';
export declare const rootNode: IconNode;
export declare function convertNodesWithConfig(nodes: IconNode[], options?: ProIconsOptions): IconNode[];
export declare function renderNodeWithRoot(nodes: IconNode[], rootNode: IconNode, options: ProIconsOptions): string;
export declare function renderNodes(nodes: IconNode[]): string;
