const url =
    'https://raw.githubusercontent.com/ProCode-Software/proicons/main/icons/roblox.json'

export default {
    async load() {
        return await (await fetch(url)).json()
    },
}
