"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = void 0;
const picocolors_1 = __importDefault(require("picocolors"));
const figures_1 = __importDefault(require("figures"));
const string_1 = require("../utils/string");
const getLogger = (debug = false, silent = false) => ({
    error(error) {
        const message = (error instanceof Error && error.message) || error;
        console.log(picocolors_1.default.red(String(message)));
        if (debug && error instanceof Error) {
            console.log(error.stack);
        }
    },
    log(...values) {
        if (!silent) {
            console.log(...values);
        }
    },
    start(loadedConfigPath = null) {
        this.log(picocolors_1.default.yellow('Generating font kit...'));
        if (!loadedConfigPath)
            return;
        this.log(picocolors_1.default.green(`${figures_1.default.tick} Using configuration file: ${picocolors_1.default.green(picocolors_1.default.bold(loadedConfigPath))}`));
    },
    results({ assetsIn, writeResults, options: { inputDir } }) {
        const iconsCount = Object.values(assetsIn).length;
        this.log(picocolors_1.default.white(`${figures_1.default.tick} ${iconsCount} ${(0, string_1.pluralize)('SVG', iconsCount)} found in ${inputDir}`));
        for (const { writePath } of writeResults) {
            this.log(picocolors_1.default.blue(`${figures_1.default.tick} Generated ${picocolors_1.default.cyan(writePath)}`));
        }
        this.log(picocolors_1.default.green(picocolors_1.default.bold('Done')));
    }
});
exports.getLogger = getLogger;
//# sourceMappingURL=logger.js.map