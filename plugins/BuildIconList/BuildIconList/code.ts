
const dict: Record<string, { description: string, category: string }> = {}

const frames = figma.currentPage.selection
frames.forEach(node => {
    if (node.type == 'FRAME') {
        const frame: FrameNode = node
        frame.children.forEach(child => {
            if (child.type == 'COMPONENT') {
                dict[child.name] = { description: child.description, category: frame.name }
            }
        })
    }
})

figma.showUI(__html__);

figma.ui.postMessage(JSON.stringify(dict))