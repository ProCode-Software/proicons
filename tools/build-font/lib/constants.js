"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_START_CODEPOINT = exports.DEFAULT_OPTIONS = exports.TEMPLATES_DIR = void 0;
const path_1 = require("path");
const misc_1 = require("./types/misc");
const icon_id_1 = require("./utils/icon-id");
exports.TEMPLATES_DIR = (0, path_1.resolve)(__dirname, '../templates');
exports.DEFAULT_OPTIONS = {
    name: 'icons',
    fontTypes: [misc_1.FontAssetType.EOT, misc_1.FontAssetType.WOFF2, misc_1.FontAssetType.WOFF],
    assetTypes: [
        misc_1.OtherAssetType.CSS,
        misc_1.OtherAssetType.HTML,
        misc_1.OtherAssetType.JSON,
        misc_1.OtherAssetType.TS
    ],
    formatOptions: { json: { indent: 4 } },
    pathOptions: {},
    templates: {},
    codepoints: {},
    round: undefined,
    fontHeight: 300,
    descent: undefined,
    normalize: undefined,
    selector: null,
    tag: 'i',
    prefix: 'icon',
    fontsUrl: undefined,
    getIconId: icon_id_1.getIconId
};
exports.DEFAULT_START_CODEPOINT = 0xf101;
//# sourceMappingURL=constants.js.map