import { RunnerOptions } from '../types/runner';
import { FontGeneratorOptions } from '../types/generator';
import { AssetType } from '../types/misc';
import { AssetsMap } from '../utils/assets';
export declare const getGeneratorOptions: (options: RunnerOptions, assets: AssetsMap) => FontGeneratorOptions;
export declare const prefillOptions: <K extends AssetType, T, O = { [key in K]: T; }>(keys: K[], userOptions: { [key_1 in K]?: T; }, getDefault: (type: K) => T) => O;
export declare const mergeOptions: <T>(input: T, defaultVal: T) => T;
