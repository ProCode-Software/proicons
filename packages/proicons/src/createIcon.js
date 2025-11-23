import { ProIcon } from './types';
export function createIcon({ name, tags, category, deprecated, alternativeIcon }, nodes) {
    if (deprecated) {
        console.warn(`The icon ${name} is deprecated and will be removed in a future version. Use ${alternativeIcon} instead.`);
    }
    return new ProIcon(name, tags, category, nodes);
}
