/**
 * @returns {string?}
 * @param {NodeJS.Process} nodeProcess
 * @param  {...string} keys
 */
export function getCliParams(nodeProcess, ...keys) {
    const args = nodeProcess.argv.slice(2)

    for (const key of keys) {
        if (args.includes('-' + key) || args.includes('--' + key)) {
            const index =
                args.indexOf('-' + key) != -1
                    ? args.indexOf('-' + key)
                    : args.indexOf('--' + key)

            return args[index + 1]
        }
    }
}
