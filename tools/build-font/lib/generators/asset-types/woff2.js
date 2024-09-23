"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ttf2woff2_1 = __importDefault(require("ttf2woff2"));
const misc_1 = require("../../types/misc");
const generator = {
    dependsOn: misc_1.FontAssetType.TTF,
    async generate(_options, ttf) {
        const font = (0, ttf2woff2_1.default)(ttf);
        return Buffer.from(font.buffer);
    }
};
exports.default = generator;
//# sourceMappingURL=woff2.js.map