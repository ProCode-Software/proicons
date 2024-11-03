import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import pkg from '../package.json' with { type: 'json' }
import { getCliParams } from './build/getCliParam.js'
import ansiColors from 'ansi-colors'

// TODO: remove
const ignoredPackages = ['@proicons/react', '@proicons/roblox']

const packagePaths = ['package.json']
const packageNames = []

export async function fetchLatestVersion() {
    const packageUrl = 'https://registry.npmjs.org/proicons'
    const response = await fetch(packageUrl)
    const data = await response.json()
    return data['dist-tags'].latest
}

/** @param {string} version */
export function getBumpedVersion(version) {
    const currentDate = new Date()

    const y = currentDate.getUTCFullYear().toString().slice(-1)
    const m = (currentDate.getUTCMonth() + 1).toString().slice(-2)
    const currentRevision = +version.split('.')[2]

    const v = [y, m, version.startsWith(`${y}.${m}`) ? currentRevision + 1 : 0]
    return v.join('.')
}

for (const folderName of readdirSync(resolve('./packages'))) {
    const packageUrl = resolve(`./packages/${folderName}/package.json`)
    packagePaths.push(packageUrl)
}

;(async () => {
    let newVersion

    if (getCliParams(process, 'v')) {
        // User specified a version
        newVersion = getCliParams(process, 'v')
    } else if ((await fetchLatestVersion()) !== pkg.version) {
        // Keep the current package version if ahead
        newVersion = pkg.version
    } else if (getCliParams(process, 'keep')) {
        // Keep the current package version
        newVersion = pkg.version
    } else {
        // Bump version
        newVersion = getBumpedVersion(pkg.version)
    }

    for (const path of packagePaths) {
        const packageData = readFileSync(path, 'utf-8')
        const pn = JSON.parse(packageData).name
        const VERSION_REGEX = /("version":\s*")(\d+\.\d+\.\d+)"/

        if (ignoredPackages.includes(pn)) continue
        packageNames.push(pn)

        writeFileSync(path, packageData.replace(VERSION_REGEX, `$1${newVersion}"`))
    }

    console.log(ansiColors.green(`Bumped version to ${newVersion} for ${ansiColors.yellow(packageNames.join(', '))}`))
})()
