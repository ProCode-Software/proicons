import { ComputedRef } from "vue";
import { Icon } from "./types";
import { getHex } from "./useGlyphData";

export function copyToClipboard(data: string) {
    navigator.clipboard.writeText(data);
}

export function copySvg(icon: ComputedRef<Icon>) {
    copyToClipboard(icon.value.icon)
}
export function copyDataUri(icon: ComputedRef<Icon>) {
    const dataUrl = `data:image/svg+xml;base64,${btoa(icon.value.icon)}`;
    copyToClipboard(dataUrl)
}
export function copyChar(iconName: ComputedRef<string>) {
    // @ts-ignore
    console.log(getHex(iconName.value));
    
    const symbol = String.fromCodePoint(+`0x${getHex(iconName.value) }`)
    copyToClipboard(symbol)
}