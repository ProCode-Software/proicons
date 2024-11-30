import { kebabCase } from './rename'
import { Codepoints } from './types'

export function getHex(name: string, codepoints: Codepoints): string {
    return codepoints[kebabCase(name)]
        .toString(16).toUpperCase()
}