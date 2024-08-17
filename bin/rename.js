function camelCase(str) {
    return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
}
function kebabCase(str) {
    return str.replace(/[A-Z]/g, function (g) { return '-' + g[0].toLowerCase(); });
}
module.exports = { camelCase, kebabCase }