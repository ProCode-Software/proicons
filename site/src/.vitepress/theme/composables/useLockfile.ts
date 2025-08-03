import { type Lockfile as LockfileInterface } from './types'

type getValue<T extends keyof Lockfile> = Lockfile[T][keyof Lockfile[T]]

export type LegacyDeprecated = getValue<'deprecated'> & { icon: string }
export type LegacyLockfileItem = getValue<'icons'> & { name: string }

export class Lockfile implements LockfileInterface {
    isLegacy: boolean
    icons: Record<string, { added: string; updated?: string }>
    aliases: Record<string, string>
    deprecated: Record<string, { alternative?: string; version: string }>

    constructor({ icons, aliases, deprecated }: LockfileInterface, version: string) {
        this.icons = icons
        this.aliases = aliases
        this.deprecated = deprecated
        this.isLegacy =
            version != 'development' && version[0] <= '4' && +version.slice(2, 4) <= 12
    }
    getIcon(name: string): LegacyLockfileItem | undefined {
        if (this.isLegacy)
            return (this.icons as unknown as LegacyLockfileItem[]).find(
                i => i.name == name
            )
        const item = this.icons[name]
        if (!item) return undefined
        return { name, ...item }
    }
    getDeprecated(icon: string): LegacyDeprecated | undefined {
        if (this.isLegacy)
            return (this.deprecated as unknown as LegacyDeprecated[]).find(
                i => i.icon == icon
            )
        const item = this.deprecated[icon]
        if (!item) return undefined
        return { icon, ...item }
    }
}
