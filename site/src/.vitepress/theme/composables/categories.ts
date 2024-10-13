export function getCategories(icons) {
    return Object.groupBy(Object.entries(icons), ([k, v]) => v.category)
}