export declare enum FontAssetType {
    EOT = "eot",
    WOFF2 = "woff2",
    WOFF = "woff",
    TTF = "ttf",
    SVG = "svg"
}
export declare enum OtherAssetType {
    CSS = "css",
    HTML = "html",
    JSON = "json",
    TS = "ts"
}
export declare const ASSET_TYPES_WITH_TEMPLATE: OtherAssetType[];
export declare const ASSET_TYPES: {
    CSS: OtherAssetType.CSS;
    HTML: OtherAssetType.HTML;
    JSON: OtherAssetType.JSON;
    TS: OtherAssetType.TS;
    EOT: FontAssetType.EOT;
    WOFF2: FontAssetType.WOFF2;
    WOFF: FontAssetType.WOFF;
    TTF: FontAssetType.TTF;
    SVG: FontAssetType.SVG;
};
export type AssetType = FontAssetType | OtherAssetType;
export interface GetIconIdOptions {
    basename: string;
    relativeDirPath: string;
    absoluteFilePath: string;
    relativeFilePath: string;
    index: number;
}
export type GetIconIdFn = (options: GetIconIdOptions) => string;
