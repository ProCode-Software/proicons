const iconsUrl = 'https://raw.githubusercontent.com/ProCode-Software/proicons/main/icons/icons.json'
const lockfileUrl = 'https://raw.githubusercontent.com/ProCode-Software/proicons/main/icons/icons.lock.json'

export default {
    async load() {
        const icons = await fetch(iconsUrl).then(res => res.json())

        return { icons }
    },
}