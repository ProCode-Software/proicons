"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHash = void 0;
const crypto_1 = __importDefault(require("crypto"));
const getHash = (...contents) => {
    const hash = crypto_1.default.createHash('md5');
    for (const content of contents) {
        hash.update(content);
    }
    return hash.digest('hex');
};
exports.getHash = getHash;
//# sourceMappingURL=hash.js.map