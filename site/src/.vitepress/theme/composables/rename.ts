export function removeParenthesis(str: string) {
    return str.replace(/[()]/g, '')
}
export function kebabCase(str: string) {
    return removeParenthesis(str).replaceAll(' ', '-').toLowerCase()
}