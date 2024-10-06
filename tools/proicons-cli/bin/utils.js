import { execSync } from "child_process";
import { resolveConfig, format } from 'prettier';
import fs from 'fs'

/**
 * Runs a command and returns the result
 * @param {string} command 
 * @returns {string}
 */
export function exec(command) {
    return execSync(command).toString('utf-8')
}

/** @param {string} fn */
export function fileName(fn) {
    return fn.slice(0, -4)
}

export async function formatJson(jsonContent) {
    const formatted = await format(JSON.stringify(jsonContent), {
        "semi": true,
        "singleQuote": true,
        "trailingComma": "all",
        "printWidth": 120,
        "endOfLine": "lf",
        "tabWidth": 4,
        parser: 'json'
    });
    return formatted
}

/**
 * 
 * @returns {string}
 */
export function getVersion() {
    return JSON.parse(
        fs.readFileSync('package.json', 'utf-8'),
    ).version
}