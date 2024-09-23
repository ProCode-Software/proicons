export declare const parseNumeric: (value: string) => number;
export declare const parseString: (value: string) => string;
export declare const parseFunction: (value: Function) => Function;
export declare const listMembersParser: <T extends string>(allowedValues: T[]) => (values: string[]) => T[];
export declare const removeUndefined: (object: Object) => Object;
export declare const parseBoolean: (val: any) => boolean;
export declare const parseDir: (dirname: string) => Promise<string>;
export declare const nullable: (fn: (value: any, cur?: any) => any) => (val: any) => any;
export declare const optional: (fn: (value: any, cur?: any) => any) => (val: any) => any;
