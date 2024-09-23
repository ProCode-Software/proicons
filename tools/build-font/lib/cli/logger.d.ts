import { RunnerResults } from '../core/runner';
export declare const getLogger: (debug?: boolean, silent?: boolean) => {
    error(error: Error | string): void;
    log(...values: any[]): void;
    start(loadedConfigPath?: string): void;
    results({ assetsIn, writeResults, options: { inputDir } }: RunnerResults): void;
};
