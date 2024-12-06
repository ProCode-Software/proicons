export function format(str: string): string {
    return str.replace(/[-_()\.\\\/+!@#$%^&*\[\]]/g, ' ').replace(/\s\s+/g, ' ').replace(/^\s+|\s+$/g, '')
}
export function camelCase(str: string): string {
    return format(str).split(' ')
        .map((word, i) => i == 0
            ? word.toLowerCase()
            : word.charAt(0).toUpperCase() + word.slice(1)
        ).join('')
}
export function kebabCase(str: string): string {
    return format(str).replaceAll(' ', '-').toLowerCase()
}
export function pascalCase(str: string): string {
    return format(str).replaceAll(' ', '')
}

export function camelToKebabCase(str: string): string {
    return str.replace(/[A-Z]/g, '-$&')
        .replace(/^\w/, (w) => w.toUpperCase())
        .toLowerCase()
}

export function kebabToPascalCase(str: string): string {
    return format(str)
        .replace(/(?<!\-)\-/g, ' ')
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join('')
}

export function pascalToCamelCase(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1)
}