export default {
    async load() {
        const version = await fetch(
            'https://api.github.com/repos/ProCode-Software/proicons/releases/latest'
        )
            .then(res => {
                if (res.ok) {
                    const releaseData = res.json() as Promise<{ tag_name: string }>

                    return releaseData
                }
                return null
            })
            .then(res => res.tag_name)

        return {
            version,
        }
    },
}
