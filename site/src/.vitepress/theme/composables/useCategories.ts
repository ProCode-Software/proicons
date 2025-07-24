import { IconAction, IconActionEntry } from './types'

function sortIcons(entries: IconActionEntry[]): IconActionEntry[] {
    return entries.sort((a, b) => {
        return a[0].localeCompare(b[0])
    })
}

function sortCategories(icons: Object) {
    const entries = Object.entries(icons)

    return sortIcons(entries)
}

export function getCategories(
    icons: Record<string, IconAction>
): Record<string, IconActionEntry[]> {
    return Object.groupBy(sortCategories(icons), ([k, v]) => v.category)
}

export function sortCategoryEntries(entries: [string, IconActionEntry[]][]) {
    return entries.sort((a, b) => {
        return a[0].localeCompare(b[0])
    })
}

export type IconResultEntry = [string, IconAction & { score?: number }]

export function sortSearchResults(results: IconResultEntry[]) {
    return results.sort((a, b) => {
        return b[1].score - a[1].score
    })
}
