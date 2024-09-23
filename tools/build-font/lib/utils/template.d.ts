export declare const TEMPLATE_HELPERS: Record<string, Function>;
export type CompileOptions = {
    helpers?: {
        [key: string]: (...args: any[]) => string;
    };
};
export declare const renderTemplate: (templatePath: string, context: object, options?: CompileOptions) => Promise<string>;
