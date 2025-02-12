export function format(str) {
    return str.replace(/[^\w ]|^\d+/g, ' ').replace(/\s+/g, ' ').trim();
}
export function camelCase(str) {
    return format(str).split(' ')
        .map(function (word, i) {
            return i == 0
                ? word.toLowerCase()
                : word.charAt(0).toUpperCase() + word.slice(1);
        }).join('');
}
export function kebabCase(str) {
    return format(str).replaceAll(' ', '-').toLowerCase();
}
export function pascalCase(str) {
    return format(str).replaceAll(' ', '');
}
export function camelToKebabCase(str) {
    return str.replace(/[A-Z]/g, '-$&')
        .replace(/^\w/, function (w) { return w.toUpperCase(); })
        .toLowerCase();
}
export function kebabToPascalCase(str) {
    return format(str)
        .replace(/(?<!\-)\-/g, ' ')
        .split(' ')
        .map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); })
        .join('');
}
export function pascalToCamelCase(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
