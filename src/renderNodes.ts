import { ProIconsOptions } from './interfaces';
import { IconNode } from './createIcon';

export const rootNode: IconNode = [
    'svg',
    {
        width: '24',
        height: '24',
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
    },
    [],
];

export const defaultProperties: ProIconsOptions = {
    color: 'currentColor',
    size: 24,
    strokeWidth: 1.5,
};

export function renderNodeWithRoot(nodes: IconNode[]) {

}

export function renderNodes(nodes: IconNode[]) {
    
}