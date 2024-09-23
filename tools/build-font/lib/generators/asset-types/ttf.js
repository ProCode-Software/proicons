"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const svg2ttf_1 = __importDefault(require("svg2ttf"));
const misc_1 = require("../../types/misc");
const generator = {
    dependsOn: misc_1.FontAssetType.SVG,
    async generate({ formatOptions }, svg) {
        const font = (0, svg2ttf_1.default)(svg, { ts: 0, ...(formatOptions?.ttf || {}) });
        return Buffer.from(font.buffer);
    }
};
exports.default = generator;
//# sourceMappingURL=ttf.js.map