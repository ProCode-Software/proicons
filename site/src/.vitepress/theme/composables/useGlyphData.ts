import {data} from '../../data/fetchCodepoints.data'
import { kebabCase } from './rename'

export function getHex(name: string): string {
    return data[kebabCase(name)].toString(16).toUpperCase()
}