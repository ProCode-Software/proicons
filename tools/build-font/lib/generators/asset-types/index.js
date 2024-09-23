"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const misc_1 = require("../../types/misc");
const svg_1 = __importDefault(require("./svg"));
const ttf_1 = __importDefault(require("./ttf"));
const woff_1 = __importDefault(require("./woff"));
const woff2_1 = __importDefault(require("./woff2"));
const eot_1 = __importDefault(require("./eot"));
const css_1 = __importDefault(require("./css"));
const html_1 = __importDefault(require("./html"));
const json_1 = __importDefault(require("./json"));
const ts_1 = __importDefault(require("./ts"));
const generators = {
    [misc_1.FontAssetType.SVG]: svg_1.default,
    [misc_1.FontAssetType.TTF]: ttf_1.default,
    [misc_1.FontAssetType.WOFF]: woff_1.default,
    [misc_1.FontAssetType.WOFF2]: woff2_1.default,
    [misc_1.FontAssetType.EOT]: eot_1.default,
    [misc_1.OtherAssetType.CSS]: css_1.default,
    [misc_1.OtherAssetType.HTML]: html_1.default,
    [misc_1.OtherAssetType.JSON]: json_1.default,
    [misc_1.OtherAssetType.TS]: ts_1.default,
};
exports.default = generators;
//# sourceMappingURL=index.js.map