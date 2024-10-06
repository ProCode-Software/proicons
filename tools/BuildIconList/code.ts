const dict: Record<string, { description: string, category: string }> = {}

const frames = figma.currentPage.selection
// @ts-ignore
frames.forEach((node: FrameNode | ComponentNode) => {
    if (node.type == 'COMPONENT') {
        dict[node.name] = {
            description: node.description,
            // @ts-ignore
            category: node.parent?.type != 'PAGE' ? node.parent?.name : 'NO CATEGORY'
        }

    } else if (node.type == 'FRAME') {
        node.children.forEach(child => {
            if (child.type == 'COMPONENT') {
                dict[child.name] = { description: child.description, category: node.name }
            }
        })
    }
})

figma.showUI(__html__);

figma.ui.postMessage(JSON.stringify(dict))