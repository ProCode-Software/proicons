import { execSync } from "child_process";

/**
 * Runs a command and returns the result
 * @param {string} command 
 * @returns {string}
 */
export function exec(command) {
    return execSync(command).toString('utf-8')
}