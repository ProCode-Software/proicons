import * as rename from './rename';
import { convertNodesWithConfig, renderNodeWithRoot, rootNode } from './renderNodes';
export class ProIcon {
    #nodes = [];
    /** The name of the icon in Friendly Form */
    name;
    /** The name of the icon in kebab-case */
    kebabCase;
    /** The name of the icon in camelCase */
    camelCase;
    /** The category of the icon. */
    category;
    /** An array of the icon's tags. */
    tags;
    /**
     * The raw SVG string of the icon, with the default properties
     * Use `toSvg()` instead to use custom properties
     */
    raw;
    /**
     *
     * @param name The name of the icon in Friendly Form
     * @param kebabCase The name of the icon in kebab-case
     * @param camelCase The name of the icon in camelCase
     * @param category The category of the icon.
     * @param tags An array of the icon's tags.
     */
    constructor(name, tags, category, nodes) {
        this.name = name;
        this.kebabCase = rename.kebabCase(name);
        this.camelCase = rename.camelCase(name);
        this.tags = tags ?? [];
        this.category = category;
        this.#nodes = nodes;
        this.raw = this.toSvg();
    }
    /**
     * Returns an SVG string from the icon with the provided options
     * Note that this also works outside of a browser environment
     * @param options Customization options for the icon
     */
    toSvg(options) {
        return renderNodeWithRoot(convertNodesWithConfig(this.#nodes, options), rootNode, options);
    }
}
