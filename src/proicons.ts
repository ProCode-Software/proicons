import icons from './configs/icons.json';
import tags from './configs/tags.json';
const rename = require('../bin/rename');

console.log(rename.camelCase('Hello World'));

class ProIconInfo {
    constructor(
        name: string,
        kebabCase: string,
        camelCase: string,
        element: SVGElement,
        description: string,
        tags: string[],
    ) { }
}

function replace(rootElm: Element): void { }

/**
 *
 * @param key The icon name in camelCase or kebab-case
 */
function getIconInfo(key: string) {
    // Camel case
    let prop: string;

    const isFriendly = (t: string) => t.toLowerCase() == key.toLowerCase();
    const isKebab = (t: string) => rename.kebabCase(t.toLowerCase()) == rename.kebabCase(key.toLowerCase());
    const isCamel = isFriendly

    if (Object.keys(tags).some(isFriendly)) {
        prop = rename.camelCase(Object.keys(tags).find(isFriendly));

    } else if (Object.keys(tags).some(isKebab)) {
        prop = rename.camelCase(
            rename.kebabCase(Object.keys(tags)
                .find(isKebab))
                .replaceAll('-', '')
        );

    } else if (Object.keys(icons).find(isCamel)) {
        prop = Object.keys(icons).find(isCamel);

    } else {
        throw new Error(`Invalid icon key ${getIconInfo}: Icon not found`);
    }

    new ProIconInfo(
        '', '', prop, icons[prop], '', ['']
    );

    // tags: friendly
    // icons: camelCase - svg
}

export default { icons, replace, getIconInfo };
