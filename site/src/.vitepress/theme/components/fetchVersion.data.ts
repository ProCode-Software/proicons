export default {
    async load() {
        const version = await fetch('https://raw.githubusercontent.com/ProCode-Software/proicons/main/package.json')
            .then((res) => {
                if (res.ok) {
                    const releaseData = res.json() as Promise<{ version: string }>;

                    return releaseData;
                }
                return null;
            })
            .then((res) => res.version);

        return {
            version,
        };
    },
};