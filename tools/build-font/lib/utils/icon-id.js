"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIconId = void 0;
const path_1 = require("./path");
const slugify_1 = __importDefault(require("slugify"));
const getIconId = ({ relativeFilePath }) => (0, slugify_1.default)((0, path_1.removeExtension)(relativeFilePath).replace(/(\/|\\|\.)+/g, '-'), {
    replacement: '-',
    remove: /['"`]/g
});
exports.getIconId = getIconId;
//# sourceMappingURL=icon-id.js.map