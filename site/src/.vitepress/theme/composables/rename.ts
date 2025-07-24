export function removeParentheses(str: string) {
    return str.replace(/[()]/g, '')
}
export function kebabCase(str: string) {
    return removeParentheses(str).replaceAll(' ', '-').toLowerCase()
}