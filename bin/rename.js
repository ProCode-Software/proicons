function removeParenthesis(str) {
    return str.replace(/[()]/g, '')
}
function camelCase(str) {
    return removeParenthesis(str).split(' ').map((word, i) => i == 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1)).join('')
}
function kebabCase(str) {
    return removeParenthesis(str).replaceAll(' ', '-').toLowerCase()
}
export default { camelCase, kebabCase };