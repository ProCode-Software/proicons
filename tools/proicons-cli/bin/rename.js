import { fstat, readFileSync, renameSync, writeFileSync } from "fs";
import { formatJson } from "./utils.js";
import { resolve } from "path";
import * as renameText from '../../../bin/rename.js'
import ansiColors from "ansi-colors";
const kebabCase = renameText.kebabCase


/**
 * 
 * @param {string} oldName 
 * @param {string} newName 
 * @param {{ 'no-alias': boolean }} options 
 */
export function rename(oldName, newName, options) {
    const imgDirs = ['svg',
        'png/white', 'png@3x/white', 'png@5x/white',
        'png/black', 'png@3x/black', 'png@5x/black']

    const lockFilePath = resolve('icons', 'icons.lock.json')

    /** @type {import('../../../icons/icons.lock.json')} */
    const lockfile = JSON.parse(readFileSync(lockFilePath))

    try {
        if (!lockfile.icons.some((item) => item.name == oldName)) {
            throw new Error(`Icon name '${oldName}' does not exist`)
        }
        imgDirs.forEach(dirName => {
            const isPngDir = dirName.startsWith('png')
            const getDirName = (n) => resolve('icons', dirName, kebabCase(n) + `${dirName == 'svg' ? '.svg' : '.png'}`)

            renameSync(getDirName(oldName), getDirName(newName))
        })

        if (!options['no-alias']) {
            lockfile.aliases[oldName] = newName
            writeFileSync(lockFilePath, formatJson(lockfile))
        }

        console.log(ansiColors.green(`Successfully renamed ${oldName} to ${newName}${!options["no-alias"] ? ' and created alias' : ''}.`));

        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}