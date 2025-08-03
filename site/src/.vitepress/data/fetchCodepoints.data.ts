const codepointsUrl =
    'https://raw.githubusercontent.com/ProCode-Software/proicons/main/icons/fonts/ProIcons.json'

export default {
    async load() {
        const icons = await fetch(codepointsUrl).then(res => res.json())

        return { ...icons }
    },
}
