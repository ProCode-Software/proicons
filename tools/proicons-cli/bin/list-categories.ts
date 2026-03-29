import { readFileSync } from 'fs'
import { resolve } from 'path'

type IconsFile = typeof import('../../../icons/icons.json')
const iconsFile = resolve('icons/icons.json')

export function listCategories() {
    const categories = new Set()
    const icons: IconsFile = JSON.parse(readFileSync(iconsFile, 'utf-8'))
    for (const { category } of Object.values(icons)) categories.add(category)
    for (const category of categories) console.log(category)
    process.exit(0)
}
