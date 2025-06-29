import { JSDOM } from 'jsdom'

export type IconNode = [string, Record<string, string>, IconNode[]]

/**
 * Converts an SVG string to an array of IconNodes
 * @param {string} svg
 * @returns {IconNode[]}
 */
export function createSvgNodes(svg) {
    const parser = new JSDOM(svg)
    const svgElement = parser.window.document.querySelector('svg')

    /**
     * @returns {IconNode[]}
     * @param {Element} element
     */
    function renderNodeList(element) {
        const nodeArray = []

        for (const child of element.children) {
            const nodeItem = [
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
