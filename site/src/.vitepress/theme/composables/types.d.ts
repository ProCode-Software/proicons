export interface Icon {
    category: string,
    description: string,
    icon: string
}
export interface Lockfile {
    icons: { name: string, added: string, updated?: string }[],
    aliases: Record<string, string>,
    deprecated: { icon: string, alternative?: string, version: string }[]
}
export type IconEntry = [string, Icon]

export type Codepoints = Record<string, number>