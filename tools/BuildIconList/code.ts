const dict: Record<string, { description: string, category?: string, icon: string }> = {}

// @ts-ignore
const frames: (ComponentNode | FrameNode)[] = figma.currentPage.selection
let iconsWithoutCategories = 0

const exportIcon = async (iconNode: ComponentNode) => {
    const buffer = await iconNode.exportAsync({ format: 'SVG_STRING' })
    return buffer
}
const addIcon = async (iconNode: ComponentNode) => {
    let category
    if (iconNode.parent?.type == 'PAGE') {
        category = 'NO CATEGORY'
        iconsWithoutCategories++
    } else {
        category = iconNode.parent?.name
    }

    dict[iconNode.name] = {
        description: iconNode.description,
        category,
        icon: await exportIcon(iconNode)
    }
    console.log(dict[iconNode.name].icon);
}

(async () => {
    if (frames.length == 0) {
        figma.notify('No components selected')
        return
    }
    for (const node of frames) {
        if (node.type == 'COMPONENT') {
            await addIcon(node)

        } else if (node.type == 'FRAME') {
            for (const child of node.children) {
                if (child.type == 'COMPONENT') {
                    await addIcon(child)
                }
            }
        }
    }
    figma.notify(`Successfully built file for ${frames.length} icon${frames.length == 1 ? '' : 's'}`)

    if (iconsWithoutCategories > 0) {
        figma.notify(`${iconsWithoutCategories} icon${iconsWithoutCategories > 1 ? 's do not have categories' : ' does not have a category'}`, {
            error: true
        })
    }
})().then(() => {
    figma.showUI(__html__);

    figma.ui.postMessage(JSON.stringify(dict))
})