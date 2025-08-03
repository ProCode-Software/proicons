import { LegacyDeprecated, Lockfile } from './useLockfile'

export function getDeprecationData(
    iconName: string,
    lockfile: Lockfile
): LegacyDeprecated | undefined {
    return lockfile.getDeprecated(iconName)
}
