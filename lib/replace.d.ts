import { ProIconReplaceConfig } from './interfaces';
/**
 * Converts all elements with the `proicon` attribute (which can be customised in the config) on the page to an icon corresponding to the attribute value.
 * @param rootElm The element to search inside for children with the `proicon` attribute. Defaults to `document.body`.
 * @param config An optional configuration to customise the behaviour of the replace method
 */
declare function replace(rootElm?: Element, config?: ProIconReplaceConfig): void;
export default replace;
