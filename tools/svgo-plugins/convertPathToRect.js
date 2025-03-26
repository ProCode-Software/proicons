/**
 * An SVGO plugin that converts paths to rounded rectangles
 * @type {import("svgo").CustomPlugin}
 */
export default {
    name: 'convertPathToRect',
    description: 'Converts paths to rounded rectangles',
    fn: () => {
        let PATH_REGEX = /^M(\d+) (\d+)A(\d+) \3 0 0 1 (\d+) (\d+)h(\d+)a\3 \3 0 0 1 \3 \3v(\d+)a\3 \3 0 0 1-\3 \3h-\6a\3 \3 0 0 1-\3-\3v-\7Z$/
        PATH_REGEX = new RegExp(PATH_REGEX.source.replaceAll('\\d', '[-\\d.]'))

        return {
            element: {
                enter: (node) => {
                    if (node.name.toLowerCase() != 'path') return
                    /*
                        <rect width="10" height="12" x="11" y="8" stroke="#8717FF" stroke-width="1.5" rx="2.6" />
                        <!-- <_ stroke="#8717FF" stroke-width="1.5"
                            d="M(x) (y + rad)A(rad) (rad) 0 0 1 (x + rad) (y)h(rem w)a(rad) (rad) 0 0 1 (rad) (rad)v(rem h)a(rad) (rad) 0 0 1-(rad) (rad)h-(rem w)a(rad) (rad) 0 0 1-(rad)-(rad)v-(rem h)Z" /> -->
                    */
                    const { d, ...attrs } = node.attributes
                    const matches = d.match(PATH_REGEX)
                    if (!matches) return

                    const [_, x, _radY, rad, _radX, y, remW, remH] = matches.map(Number)
                    node.name = 'rect'
                    node.children = []
                    node.attributes = {
                        width: remW + rad * 2,
                        height: remH + rad * 2,
                        rx: rad,
                        x, y, ...attrs,
                    }
                }
            }
        }
    }
}