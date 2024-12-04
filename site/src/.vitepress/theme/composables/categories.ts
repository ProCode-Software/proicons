import { IconsFile } from "./types"

function sortIcons(entries: [string, Object][]) {
    return entries.sort((a, b) => {
        return a[0].localeCompare(b[0])
    })
}

function sortCategories(icons: Object) {
    const entries = Object.entries(icons)

    return sortIcons(entries)
}

export function getCategories(icons): Record<string, [string, Object][]> {
    return Object.groupBy(sortCategories(icons), ([k, v]) => v.category)
}

export function sortCategoryEntries(entries: [string, [string, Object][]][]) {
    return entries.sort((a, b) => {
        return a[0].localeCompare(b[0])
    })
}

export function sortSearchResults(results: [string, { score: number }]) {
    return results.sort((a, b) => {
        return b[1].score - a[1].score
    })
}