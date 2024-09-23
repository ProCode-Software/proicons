"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ttf2woff_1 = __importDefault(require("ttf2woff"));
const misc_1 = require("../../types/misc");
const generator = {
    dependsOn: misc_1.FontAssetType.TTF,
    async generate({ formatOptions }, ttf) {
        const font = (0, ttf2woff_1.default)(new Uint8Array(ttf), formatOptions?.woff);
        return Buffer.from(font.buffer);
    }
};
exports.default = generator;
//# sourceMappingURL=woff.js.map