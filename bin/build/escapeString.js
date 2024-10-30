/**
 * Escapes string quotes inside a string
 * @returns {string}
 * @param {string} string 
 */
export function escapeStringQuotes(string) {
    return string.replace(/[\'\"\`\\]/g, '\\$&')
}