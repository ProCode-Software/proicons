"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitSegments = exports.removeExtension = void 0;
const path_1 = require("path");
const removeExtension = (path) => path.includes('.') ? path.split('.').slice(0, -1).join('.') : path;
exports.removeExtension = removeExtension;
const splitSegments = (path) => (0, path_1.normalize)(path)
    .split(/\/|\\/)
    .filter(part => part && part !== '.');
exports.splitSegments = splitSegments;
//# sourceMappingURL=path.js.map