"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeAssets = exports.loadAssets = exports.loadPaths = exports.ASSETS_EXTENSION = void 0;
const promises_1 = require("fs/promises");
const glob_1 = __importDefault(require("glob"));
const path_1 = require("path");
const util_1 = require("util");
const path_2 = require("../utils/path");
exports.ASSETS_EXTENSION = 'svg';
const loadPaths = async (dir) => {
    const globPath = (0, path_1.join)(dir, `**/*.${exports.ASSETS_EXTENSION}`);
    const files = await (0, util_1.promisify)(glob_1.default)(globPath, {});
    if (!files.length) {
        throw new Error(`No SVGs found in ${dir}`);
    }
    return files;
};
exports.loadPaths = loadPaths;
const failForConflictingId = ({ relativePath: pathA, id }, { relativePath: pathB }) => {
    throw new Error(`Conflicting result from 'getIconId': '${id}' - conflicting input files:\n` +
        [pathA, pathB].map(fpath => `  - ${fpath}`).join('\n'));
};
const loadAssets = async ({ inputDir, getIconId }) => {
    const paths = await (0, exports.loadPaths)(inputDir);
    const out = {};
    let index = 0;
    for (const path of paths) {
        const relativePath = (0, path_1.relative)((0, path_1.resolve)(inputDir), (0, path_1.resolve)(path));
        const parts = (0, path_2.splitSegments)(relativePath);
        const basename = (0, path_2.removeExtension)(parts.pop());
        const absolutePath = (0, path_1.resolve)(path);
        const iconId = getIconId({
            basename,
            relativeDirPath: (0, path_1.join)(...parts),
            absoluteFilePath: absolutePath,
            relativeFilePath: relativePath,
            index
        });
        const result = { id: iconId, relativePath, absolutePath };
        if (out[iconId]) {
            failForConflictingId(out[iconId], result);
        }
        out[iconId] = result;
        index++;
    }
    return out;
};
exports.loadAssets = loadAssets;
const writeAssets = async (assets, { name, pathOptions = {}, outputDir }) => {
    const results = [];
    for (const ext of Object.keys(assets)) {
        const filename = [name, ext].join('.');
        const writePath = pathOptions[ext] || (0, path_1.join)(outputDir, filename);
        results.push({ content: assets[ext], writePath });
        await (0, promises_1.writeFile)(writePath, assets[ext]);
    }
    return results;
};
exports.writeAssets = writeAssets;
//# sourceMappingURL=assets.js.map