function camelCase(str) {
    return str
        .toLowerCase()
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
            index === 0 ? match.toLowerCase() : match.toUpperCase().trim()
        )
        .replace(/\s+/g, "");
}
function kebabCase(str) {
    return str.replaceAll(' ', '-').toLowerCase()
}
module.exports = { camelCase, kebabCase };