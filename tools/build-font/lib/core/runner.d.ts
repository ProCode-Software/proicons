import { RunnerOptions } from '../types/runner';
import { AssetsMap, WriteResults } from '../utils/assets';
import { CodepointsMap } from '../utils/codepoints';
import { GeneratedAssets } from '../generators/generate-assets';
export interface RunnerResults {
    options: RunnerOptions;
    writeResults: WriteResults;
    assetsIn: AssetsMap;
    assetsOut: GeneratedAssets;
    codepoints: CodepointsMap;
}
export declare const sanitiseOptions: (userOptions: any) => Promise<RunnerOptions>;
export declare const generateFonts: (userOptions: RunnerOptions, mustWrite?: boolean) => Promise<RunnerResults>;
