function sortIcons(entries) {
    return entries.sort((a, b) => {
        return a[0].localeCompare(b[0])
    })
}

function sortCategories(icons) {
    const entries = Object.entries(icons)
    entries.sort((a, b) => {
        return a[1].category.localeCompare(b[1].category)
    })
    return sortIcons(entries)
}

export function getCategories(icons) {
    return Object.groupBy(sortCategories(icons), ([k, v]) => v.category)
}