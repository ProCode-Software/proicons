"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAssets = void 0;
const asset_types_1 = __importDefault(require("./asset-types"));
const generateAssets = async (options) => {
    const generated = {};
    const generateTypes = [...options.fontTypes, ...options.assetTypes];
    const generateAsset = async (type) => {
        if (generated[type]) {
            return generated[type];
        }
        const generator = asset_types_1.default[type];
        const dependsOn = 'dependsOn' in generator && generator.dependsOn;
        if (dependsOn && !generated[dependsOn]) {
            generated[dependsOn] = await generateAsset(dependsOn);
        }
        return (generated[type] = await generator.generate(options, dependsOn ? generated[dependsOn] : null));
    };
    for (const type of generateTypes) {
        await generateAsset(type);
    }
    return generateTypes.reduce((out, type) => ({ ...out, [type]: generated[type] }), {});
};
exports.generateAssets = generateAssets;
//# sourceMappingURL=generate-assets.js.map