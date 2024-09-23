/// <reference types="node" />
import { FontAssetType, OtherAssetType } from '../types/misc';
import { FontGeneratorOptions } from '../types/generator';
export type GeneratedAssets = {
    [key in FontAssetType | OtherAssetType]?: string | Buffer;
};
export declare const generateAssets: (options: FontGeneratorOptions) => Promise<GeneratedAssets>;
