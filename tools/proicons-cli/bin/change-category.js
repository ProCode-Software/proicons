import { readFileSync, writeFileSync } from 'fs';
import { resolve } from "path";
import { formatJson } from "./utils.ts";
import pkg from '../../../package.json' with {type: 'json'}
import ansiColors from "ansi-colors";
const { version } = pkg

const iconsFilePath = resolve('icons/icons.json')
const lockfilePath = resolve('icons/icons.lock.json')
/**
 * 
 * @param {string} iconName 
 * @param {string} newCategory
 */
export async function changeCategory(iconName, newCategory) {
    const iconsFile = JSON.parse(readFileSync(iconsFilePath, 'utf-8'))
    const lockfile = JSON.parse(readFileSync(lockfilePath, 'utf-8'))

    if (!lockfile.icons.some((item) => item.name == iconName)) {
        throw new Error(`Icon name '${iconName}' does not exist`)
    }
    try {
        const oldCategory = iconsFile[iconName].category
        iconsFile[iconName].category = newCategory
        lockfile.icons[iconName].updated = version

        writeFileSync(iconsFilePath, await formatJson(iconsFile))
        writeFileSync(lockfilePath, await formatJson(lockfile))

        console.log(ansiColors.green(`Successfully changed category of '${iconName}' from ${ansiColors.yellow(oldCategory)} to ${ansiColors.yellow(newCategory)}`));
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}