export default {
    name: 'ellipseToCircle',
    description: 'A plugin that converts ellipses to circles',
    fn: () => {
        return {
            element: {
                enter: (node, parent) => {
                    const { cx, cy, rx, ry, ...attrs } = node.attributes
                    if (rx !== ry) return

                    const newNode = node
                    newNode.name = 'circle'
                    newNode.attributes = {
                        cx, cy,
                        r: rx,
                        ...attrs
                    }

                    parent.children = parent.children.map(
                        (child) => child !== node ? child : newNode
                    )
                }
            }
        }
    }
}