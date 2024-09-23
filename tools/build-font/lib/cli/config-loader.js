"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = exports.DEFAULT_FILEPATHS = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
const fs_async_1 = require("../utils/fs-async");
exports.DEFAULT_FILEPATHS = [
    '.fantasticonrc',
    'fantasticonrc',
    '.fantasticonrc.json',
    'fantasticonrc.json',
    '.fantasticonrc.js',
    'fantasticonrc.js'
];
const attemptLoading = async (filepath) => {
    const fileExists = await (0, fs_async_1.checkPath)(filepath, 'file');
    if (fileExists) {
        try {
            return require((0, path_1.join)(process.cwd(), filepath));
        }
        catch (err) { }
        try {
            const content = await (0, promises_1.readFile)(filepath, 'utf8');
            return JSON.parse(content);
        }
        catch (err) { }
        throw new Error(`Failed parsing configuration at '${filepath}'`);
    }
};
const loadConfig = async (filepath) => {
    let loadedConfigPath = null;
    let loadedConfig = {};
    if (filepath) {
        loadedConfig = await attemptLoading(filepath);
        loadedConfigPath = filepath;
    }
    else {
        for (const path of exports.DEFAULT_FILEPATHS) {
            loadedConfig = await attemptLoading(path);
            if (loadedConfig) {
                loadedConfigPath = path;
                break;
            }
        }
    }
    return { loadedConfig, loadedConfigPath };
};
exports.loadConfig = loadConfig;
//# sourceMappingURL=config-loader.js.map