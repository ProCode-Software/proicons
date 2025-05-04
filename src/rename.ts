function clean(str: string) {
    return str
        .trim()
        .replaceAll('&', 'And')
        .replace(/_|[^\w\d]+/g, ' ')
}
export function camelCase(str: string) {
    return clean(str)
        .replace(/(?<=\s|^)[a-z]/g, (m: string) => m.toUpperCase())
        .replace(/^\s*\d+/, '')
        .replace(/^\w+/, (m: string) => m.toLowerCase())
        .replaceAll(' ', '')
}
export function kebabCase(str: string) {
    return clean(str)
        .replace(/\s+/g, '-')
        .replace(/^-?\d+/, '')
        .replace(/^-|-$/g, '')
        .replace(/-{2,}/, '-')
        .toLowerCase()
}
export function pascalCase(str: string) {
    return clean(str)
        .replace(/(?<=\s|^)[a-z]/g, (m: string) => m.toUpperCase())
        .replace(/^\s*\d+/, '')
        .replaceAll(' ', '')
}

export const kebabToCamelCase = (str: string): string =>
    str.replace(/-(.)/g, m => m[1].toUpperCase())

export const camelToKebabCase = (str: string): string =>
    str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
