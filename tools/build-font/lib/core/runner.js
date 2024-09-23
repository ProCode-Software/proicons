"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFonts = exports.sanitiseOptions = void 0;
const constants_1 = require("../constants");
const assets_1 = require("../utils/assets");
const generator_options_1 = require("../generators/generator-options");
const config_parser_1 = require("./config-parser");
const generators_1 = require("../generators");
const sanitiseOptions = (userOptions) => (0, config_parser_1.parseConfig)({
    ...constants_1.DEFAULT_OPTIONS,
    ...userOptions
});
exports.sanitiseOptions = sanitiseOptions;
const generateFonts = async (userOptions, mustWrite = false) => {
    const options = await (0, exports.sanitiseOptions)(userOptions);
    const { outputDir, inputDir } = options;
    if (!inputDir) {
        throw new Error('You must specify an input directory');
    }
    if (mustWrite && !outputDir) {
        throw new Error('You must specify an output directory');
    }
    const assetsIn = await (0, assets_1.loadAssets)(options);
    const generatorOptions = (0, generator_options_1.getGeneratorOptions)(options, assetsIn);
    const assetsOut = await (0, generators_1.generateAssets)(generatorOptions);
    const writeResults = outputDir ? await (0, assets_1.writeAssets)(assetsOut, options) : [];
    const { codepoints } = generatorOptions;
    return {
        options,
        assetsIn,
        assetsOut,
        writeResults,
        codepoints
    };
};
exports.generateFonts = generateFonts;
//# sourceMappingURL=runner.js.map