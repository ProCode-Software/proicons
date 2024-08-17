function removeParenthesis(str) {
    return str.replace(/[()]/g, '')
}
function camelCase(str) {
    return removeParenthesis(str).toLowerCase()
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
            index === 0 ? match.toLowerCase() : match.toUpperCase().trim()
        )
        .replace(/\s+/g, "");
}
function kebabCase(str) {
    return removeParenthesis(str).replaceAll(' ', '-').toLowerCase()
}
module.exports = { camelCase, kebabCase };