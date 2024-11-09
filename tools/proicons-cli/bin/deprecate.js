import ansiColors from "ansi-colors";
import { formatJson, getVersion } from "./utils.js";
import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";

const lockFilePath = resolve('icons', 'icons.lock.json')
const monthsToDeprecated = 6

/** @type {import('../../../icons/icons.lock.json')} */
const lockfile = JSON.parse(readFileSync(lockFilePath, 'utf-8'))

export function deprecate(iconName, alternative) {
    lockfile.deprecated.push({
        icon: iconName,
        version: getVersion(),
        alternative
    })
    writeFileSync(lockFilePath, formatJson(lockfile))
}

export function auditDeprecated() {
    /**
     * 
     * @param {string} v1 
     * @param {string} v2 
     */
    const compareVersion = (v1, v2) => {
        const [n1, n2] = [v1, v2]
            .map(
                (v) => v.split('.')
                    .toReversed()
                    .map((n, i) => 10 ** i * (+n))
                    .toReversed()
                    .reduce((a, b) => a + b)
            )

        return Math.max(n1, n2)
    }
    if (!lockfile.deprecated?.length) {
        console.log(ansiColors.green('There are no deprecated icons!'));
        process.exit(0)
    }

    /**@type { { icon: string, version: string, alternative?: string, removalVersion: string }[] } */
    const deprecatedIcons = lockfile.deprecated.map(({ icon, version, alternative }) => {
        const [y, m, r] = version.split('.')

        const depM = (+m + monthsToDeprecated) % 12
        const depY = depM < +m ? +y + 1 : y

        return { icon, version, alternative, removalVersion: `${depY}.${depM}.0` }
    })

    const timeToRemove = deprecatedIcons.filter(({ removalVersion }) => compareVersion(getVersion(), removalVersion) == removalVersion)
    
    if (timeToRemove.length > 0) {
        console.log(ansiColors.bold('\nThese icons should be removed:\n'));

        console.log(
            timeToRemove.map(
                ({ icon, removalVersion }) =>
                    `${ansiColors.red(icon)} ${ansiColors.dim(`(v${removalVersion})`)}`
            ).join('\n')
        );
    }

    console.log(ansiColors.bold('\nDeprecated icons:\n'));

    deprecatedIcons.forEach(({ icon, version, alternative, removalVersion }) => {
        console.log(
            `   ${icon}
    ${ansiColors.dim(`Deprecated in v${version}; to be removed in v${removalVersion}`)}
    ${alternative ? ansiColors.yellow(`Alternative: ${alternative}`) : ''}`
        );
    })
    process.exit(0)
}