import { Lockfile } from "./types";

export function getDeprecationData(iconName: string, lockfile: Lockfile): Lockfile['deprecated'][number] | undefined {
    const deprecationEntry = lockfile.deprecated?.find(({icon}) => icon === iconName)
    if (deprecationEntry) {
        return deprecationEntry
    } else {
        return undefined
    }
}