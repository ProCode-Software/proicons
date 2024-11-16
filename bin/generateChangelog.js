import { readFileSync } from "fs";
import { resolve } from "path";

export function generateChangelog() {
    /** @type {import('../icons/icons.lock.json')} */
    const lockfile = JSON.parse(readFileSync(resolve('./icons/icons.lock.json')))
    const version = JSON.parse(readFileSync(resolve('./package.json'))).version

    const newIcons = [], updatedIcons = []

    for (const iconData of lockfile.icons) {
        if (iconData.added == version) {
            newIcons.push(iconData.name)
        } else if (iconData.updated == version) {
            updatedIcons.push(iconData.name)
        }
    }

    let changelog = ``
    if (newIcons.length) {
        changelog += `## New icons\n${newIcons.map(s => `- ${s}`).join('\n')}`
    }
    if (updatedIcons.length) {
        changelog += `\n## Updated icons\n${updatedIcons.map(s => `- ${s}`).join('\n')}`
    }

    console.log(changelog)

    return changelog
}
generateChangelog()