"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASSET_TYPES = exports.ASSET_TYPES_WITH_TEMPLATE = exports.OtherAssetType = exports.FontAssetType = void 0;
var FontAssetType;
(function (FontAssetType) {
    FontAssetType["EOT"] = "eot";
    FontAssetType["WOFF2"] = "woff2";
    FontAssetType["WOFF"] = "woff";
    FontAssetType["TTF"] = "ttf";
    FontAssetType["SVG"] = "svg";
})(FontAssetType || (exports.FontAssetType = FontAssetType = {}));
var OtherAssetType;
(function (OtherAssetType) {
    OtherAssetType["CSS"] = "css";
    OtherAssetType["HTML"] = "html";
    OtherAssetType["JSON"] = "json";
    OtherAssetType["TS"] = "ts";
})(OtherAssetType || (exports.OtherAssetType = OtherAssetType = {}));
exports.ASSET_TYPES_WITH_TEMPLATE = [
    OtherAssetType.CSS,
    OtherAssetType.HTML,
];
exports.ASSET_TYPES = { ...FontAssetType, ...OtherAssetType };
//# sourceMappingURL=misc.js.map