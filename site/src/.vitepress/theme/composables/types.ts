export interface Icon {
    category: string
    description: string
    icon: string
}
export interface IconAction extends Icon {
    action: (e: IconEntry) => void
    new: boolean
    updated: boolean
}
export interface Lockfile {
    icons: { name: string; added: string; updated?: string }[]
    aliases: Record<string, string>
    deprecated: { icon: string; alternative?: string; version: string }[]
}
export type IconEntry = [string, Icon]
export type IconActionEntry = [string, IconAction]

export type Codepoints = Record<string, number>

export type IconsFile = Record<string, Icon>
