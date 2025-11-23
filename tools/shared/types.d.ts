export interface LockfileIcon {
    added: string;
    updated?: string;
}
export interface DeprecatedIcon {
    version: string;
    alternative?: string;
}
export interface Lockfile {
    icons: Record<string, LockfileIcon>;
    aliases: Record<string, string>;
    deprecated: Record<string, DeprecatedIcon>;
}
