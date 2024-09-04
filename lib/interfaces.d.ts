export interface ProIconReplaceConfig {
    color: string;
    strokeWidth: number;
    strokeFilledElements: boolean;
    strokeCaps: 'round' | 'square' | 'butt';
    strokeJoin: 'round' | 'miter' | 'bevel';
    cornerRadius: number;
    attributeName: string;
    overwrite: boolean | 'auto';
    useAttributes: false;
}
export declare class ProIconInfo {
    name: string;
    kebabCase: string;
    camelCase: string;
    element: SVGSVGElement;
    category: string;
    tags: string[];
    constructor(name: string, kebabCase: string, camelCase: string, element: SVGSVGElement, tags: string[], category: string);
}
