const lockfileUrl = 'https://raw.githubusercontent.com/ProCode-Software/proicons/main/icons/icons.lock.json'

export default {
    async load() {
        const icons = await fetch(lockfileUrl).then(res => res.json())

        return { icons }
    },
}