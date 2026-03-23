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
import * as icons from './icons'
import type { ProIconAttributes } from './types'
import { getPascalName } from './utils'

type IconEnum<T extends string> = T extends `${infer Base}Icon` ? Base : T
type IconProp = IconEnum<keyof typeof icons> | (string & {})

type Props = ProIconAttributes & { icon: IconProp }
const { icon, ...props }: Props = $props()

const Icon = $derived.by(() => {
    if (!icon) throw new TypeError("An 'icon' attribute is required.")

    const name = getPascalName(icons, icon)
    if (!name) throw new Error(`Icon '${icon}' not found.`)
    return icons[name]
})
</script>

<Icon {...props} />
