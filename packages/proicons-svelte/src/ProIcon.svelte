<!--
@component
Generic icon component that can be used to import icons by their name.

Note: This breaks tree-shaking
@example
```svelte
<ProIcon icon="Add Square" color="red" strokeWidth={2} />
```
[Documentation](https://procode-software.github.io/proicons/docs/svelte#proicon-component)
-->
<script lang="ts">
import type { ProIconAttributes } from './types'
import * as icons from './icons'
import { kebabCase, pascalCase } from './utils'

type Props = ProIconAttributes & { icon: string }
const { icon, ...props }: Props = $props()

if (!icon) {
    throw new Error("An 'icon' attribute is required.")
}
function getPascalName(name: string) {
    const lowerName = name.toLowerCase()
    const iconEntries = Object.keys(icons)
    
    return iconEntries.find(pascalName => {
        const lowerIconName = pascalName.replace(/Icon$/, '').toLowerCase()

        return (
            lowerIconName == lowerName ||
            lowerIconName + 'icon' == lowerName ||
            kebabCase(lowerIconName) == lowerName ||
            lowerIconName == pascalCase(lowerName)
        )
    })
}
const name = getPascalName(icon)

if (!name) {
    throw new Error(`Icon '${name}' not found.`)
}

const Icon = icons[name]
</script>

<Icon {...props} />