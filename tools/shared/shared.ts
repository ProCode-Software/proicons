import { kebabCase, pascalCase } from '../../packages/proicons/src/rename.ts'

export * from '../../packages/proicons/src/rename.ts'
export * from '../../packages/proicons/src/renderNodes.ts'
export * from './types.ts'

/**
 * Searches `icons` for an icon with the given `name` (can be in any case) and returns the PascalCase name of the icon, or `undefined` if not found.
 * @param icons The icons to search in.
 * @param name The name of the icon to search for.
 * @returns The PascalCase name of the icon, or `undefined` if not found.
 */
export function getPascalName(
    icons: Record<string, any>,
    name: string
): string | undefined {
    name = name.replace(/Icon$/i, '')
    const lowerName = name.toLowerCase()
    return name in icons
        ? name
        : Object.keys(icons).find(pascalName => {
              // Doesn't end in Icon
              const lowerIconName = pascalName.replace(/Icon$/i, '').toLowerCase()
              return (
                  lowerIconName == lowerName ||
                  kebabCase(lowerIconName) == lowerName ||
                  pascalName == pascalCase(name)
              )
          })
}
