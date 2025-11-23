export const rootNode = [
    'svg',
    {
        width: '24',
        height: '24',
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
    },
    [],
];
export function convertNodesWithConfig(nodes, options) {
    const defaultStroke = 1.5;
    const attributeKey = {
        // configKey, svgAttr
        color: ['stroke', 'fill'],
        strokeWidth: ['stroke-width'],
        strokeCaps: ['stroke-linejoin'],
        strokeJoin: ['stroke-linecap'],
        cornerRadius: ['rx'],
    };
    if (!options)
        return nodes;
    return nodes.map(node => {
        const [_, props, children] = node;
        for (const [optionK, svgAttrs] of Object.entries(attributeKey)) {
            for (const s of svgAttrs) {
                if (props[s] && options[optionK]) {
                    props[s] = options[optionK];
                }
            }
        }
        // Outlining
        if (props.fill != undefined &&
            props.fill != 'none' &&
            props.stroke != undefined &&
            props.stroke != 'none' &&
            (options?.strokeWidth ?? 0) > defaultStroke) {
            props['stroke-width'] = (options.strokeWidth - defaultStroke).toString();
            props.stroke = props.fill;
            props['stroke-linecap'] = options.strokeCaps ?? 'round';
            props['stroke-linejoin'] = options.strokeJoin ?? 'round';
        }
        if (children.length)
            node[2] = convertNodesWithConfig(children, options);
        return node;
    });
}
export function renderNodeWithRoot(nodes, rootNode, options) {
    const root = structuredClone(rootNode);
    const [_, props, children] = root;
    children.push(...nodes);
    if (options?.size) {
        props.width = options.size.toString();
        props.height = options.size.toString();
    }
    if (options?.attributes) {
        for (const [k, v] of Object.entries(options.attributes)) {
            props[k] = v;
        }
    }
    return renderNodes([root]);
}
export function renderNodes(nodes) {
    return nodes
        .map(([element, attrs, children]) => {
        const attrMap = Object.entries(attrs).map(([k, v]) => `${k}=${JSON.stringify(v)}`);
        return `<${element} ${attrMap.join(' ')}${children.length > 0 ? `>${renderNodes(children)}</${element}>` : ' />'}`;
    })
        .join('');
}
