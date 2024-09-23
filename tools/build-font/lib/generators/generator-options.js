"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeOptions = exports.prefillOptions = exports.getGeneratorOptions = void 0;
const path_1 = require("path");
const constants_1 = require("../constants");
const codepoints_1 = require("../utils/codepoints");
const misc_1 = require("../types/misc");
const getGeneratorOptions = (options, assets) => ({
    ...options,
    codepoints: (0, codepoints_1.getCodepoints)(assets, options.codepoints),
    formatOptions: (0, exports.prefillOptions)(Object.values(misc_1.ASSET_TYPES), options.formatOptions, assetType => constants_1.DEFAULT_OPTIONS.formatOptions[assetType] || {}),
    templates: (0, exports.prefillOptions)(misc_1.ASSET_TYPES_WITH_TEMPLATE, options.templates, assetType => (0, path_1.join)(constants_1.TEMPLATES_DIR, `${assetType}.hbs`)),
    assets
});
exports.getGeneratorOptions = getGeneratorOptions;
const prefillOptions = (keys, userOptions = {}, getDefault) => keys.reduce((cur = {}, type) => ({
    ...cur,
    [type]: (0, exports.mergeOptions)(userOptions[type], getDefault(type))
}), {});
exports.prefillOptions = prefillOptions;
const mergeOptions = (input, defaultVal) => {
    if (typeof defaultVal === 'object') {
        return { ...defaultVal, ...input };
    }
    return input || defaultVal;
};
exports.mergeOptions = mergeOptions;
//# sourceMappingURL=generator-options.js.map