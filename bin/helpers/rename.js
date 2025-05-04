function clean(str) {
    return str.trim().replaceAll('&', 'And').replace(/_|[^\w\d]+/g, ' ')
}
export function camelCase(str) {
    return clean(str)
        .replace(/(?<=\s|^)[a-z]/g, m => m.toUpperCase())
        .replace(/^\s*\d+/, '')
        .replace(/^\w+/, m => m.toLowerCase())
        .replaceAll(' ', '')
}
export function kebabCase(str) {
    return clean(str)
        .replace(/\s+/g, "-")
        .replace(/^-?\d+/, '')
        .replace(/^-|-$/g, '')
        .replace(/-{2,}/, '-')
        .toLowerCase()
}
export function pascalCase(str) {
    return clean(str)
        .replace(/(?<=\s|^)[a-z]/g, m => m.toUpperCase())
        .replace(/^\s*\d+/, '')
        .replaceAll(' ', '')
}
