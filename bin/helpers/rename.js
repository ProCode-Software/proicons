/**
 * @param {string} str 
 * @returns string
 */
export function format(str) {
    return str.replace(/[-_()\.\\\/+!@#$%^&*\[\]]/g, ' ').replace(/\s\s+/g, ' ').replace(/^\s+|\s+$/g, '')
}

/**
 * @param {string} str 
 * @returns string
 */
export function camelCase(str) {
    return format(str).split(' ').map((word, i) => i == 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1)).join('')
}

/**
 * @param {string} str 
 * @returns string
 */
export function kebabCase(str) {
    return format(str).replaceAll(' ', '-').toLowerCase()
}

/**
 * @param {string} str 
 * @returns string
 */
export function pascalCase(str) {
    return format(str).replaceAll(' ', '')
}

/**
 * @param {string} str 
 * @returns string
 */
export function kebabToPascalCase(str) {
    return format(str)
        .replace(/(?<!\-)\-/g, ' ')
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join('')
}

/**
 * @param {string} str 
 * @returns string
 */
export function pascalToCamelCase(str) {
    return str.charAt(0).toLowerCase() + str.slice(1)
}