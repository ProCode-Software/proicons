"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPath = void 0;
const promises_1 = require("fs/promises");
const checkPath = async (filepath, type) => {
    try {
        const result = await (0, promises_1.stat)(filepath);
        if (type) {
            return type === 'directory' ? result.isDirectory() : result.isFile();
        }
        return true;
    }
    catch (err) {
        return false;
    }
};
exports.checkPath = checkPath;
//# sourceMappingURL=fs-async.js.map