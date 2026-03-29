import { existsSync, readFileSync, renameSync, writeFileSync } from 'fs'
import { formatJson } from './utils.ts'
import { resolve } from 'path'
import * as renameText from '@proicons/shared'
import ansiColors from 'ansi-colors'
import pkg from '../../../package.json' with { type: 'json' }
const { version } = pkg
const { kebabCase } = renameText

export async function rename(
    oldName: string,
    newName: string,
    options: { 'no-alias': boolean }
) {
    const imgDirs = [
        'svg',
        'png/white',
        'png@3x/white',
        'png@5x/white',
        'png/black',
        'png@3x/black',
        'png@5x/black',
    ]

    const lockFilePath = resolve('icons', 'icons.lock.json')
    const iconsPath = resolve('icons', 'icons.json')

    /** @type {import('../../../icons/icons.lock.json')} */
    const lockfile = JSON.parse(readFileSync(lockFilePath, 'utf-8'))
    const iconsFile = JSON.parse(readFileSync(iconsPath, 'utf-8'))

    try {
        if (!lockfile.icons.some((item: { name: any }) => item.name == oldName)) {
            throw new Error(`Icon name '${oldName}' does not exist`)
        }

        iconsFile[newName] = iconsFile[oldName]
        delete iconsFile[oldName]

        imgDirs.forEach(dirName => {
            const getDirName = (n: string) =>
                resolve(
                    'icons',
                    dirName,
                    kebabCase(n) + `${dirName == 'svg' ? '.svg' : '.png'}`
                )
            if (existsSync(getDirName(oldName)))
                renameSync(getDirName(oldName), getDirName(newName))
        })

        if (!options['no-alias']) {
            lockfile.aliases[oldName] = newName
        }
        const index = lockfile.icons.findIndex(
            (item: { name: any }) => item.name == oldName
        )
        lockfile.icons[index].name = newName
        lockfile.icons[index].updated = version

        writeFileSync(lockFilePath, await formatJson(lockfile))
        writeFileSync(iconsPath, await formatJson(iconsFile))

        console.log(
            ansiColors.green(
                `Successfully renamed ${ansiColors.yellow(oldName)} to ${ansiColors.yellow(newName)}${!options['no-alias'] ? ' and created alias' : ''}.`
            )
        )

        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
