import { ComputedRef } from 'vue'
import { Codepoints, Icon } from './types'
import { getHex } from './useGlyphData'
import { kebabCase } from './rename'

export function copyToClipboard(data: string) {
    navigator.clipboard.writeText(data)
}

export function copySvg(icon: ComputedRef<Icon>) {
    copyToClipboard(icon.value.icon)
}

export function copyDataUri(icon: ComputedRef<Icon>) {
    const dataUrl = `data:image/svg+xml;base64,${btoa(icon.value.icon)}`
    copyToClipboard(dataUrl)
}

export function copyChar(iconName: ComputedRef<string>, codepoints: Codepoints) {
    const hex = getHex(iconName.value, codepoints)
    const symbol = String.fromCodePoint(+`0x${hex}`)
    copyToClipboard(symbol)
}

export function downloadSvg(iconName: ComputedRef<string>, icon: ComputedRef<Icon>) {
    const dataUrl = `data:image/svg+xml;base64,${btoa(icon.value.icon)}`
    downloadData(dataUrl, `proicons-${kebabCase(iconName.value)}.svg`)
}

export function downloadPng(iconName: ComputedRef<string>, icon: ComputedRef<Icon>) {
    const size = +icon.value.icon.match(/width="(.*?)"/)[1]

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = size
    canvas.height = size

    const image = new Image(size, size)
    image.src = `data:image/svg+xml;base64,${btoa(icon.value.icon)}`
    image.onload = () => {
        ctx.drawImage(image, 0, 0)

        const dataUrl = canvas.toDataURL('image/png')
        downloadData(dataUrl, `proicons-${kebabCase(iconName.value)}.png`)
    }
}

function downloadData(data: string, filename: string) {
    const link = document.createElement('a')
    link.href = data
    link.download = filename
    link.click()
}
