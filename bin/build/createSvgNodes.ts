import { JSDOM } from 'jsdom'

export type IconNode = [string, Record<string, string>, IconNode[]]

export function createSvgNodes(svg: string): IconNode[] {
    const parser = new JSDOM(svg)
    const svgElement = parser.window.document.querySelector('svg')

    function renderNodeList(element: Element): IconNode[] {
        const nodeArray: IconNode[] = []
        for (const child of element.children) {
            const nodeItem: IconNode = [
                child.tagName,
                child.attributes.length > 0
                    ? Object.fromEntries(
                          [...child.attributes].map(({ name, value }) => [name, value])
                      )
                    : {},
                child.children.length > 0 ? renderNodeList(child) : [],
            ]
            nodeArray.push(nodeItem)
        }
        return nodeArray
    }
    return renderNodeList(svgElement)
}
