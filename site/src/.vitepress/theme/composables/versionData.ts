import { Codepoints, Icon, Lockfile } from "./types"

const releaseEndpoint = 'https://api.github.com/repos/ProCode-Software/proicons/releases'
const repoEndpoint = 'https://api.github.com/repos/ProCode-Software/proicons'

export interface ReleaseAsset {
    name: string,
    browser_download_url: string
}

export interface ReleaseData {
    tag_name: string,
    html_url: string,
    published_at: string,
    prerelease: boolean,
    name: string,
    body: string,
    assets: ReleaseAsset[]
}

export async function fetchVersionData() {
    const data: ReleaseData[] = await (await fetch(releaseEndpoint)).json()

    const dataObj = Object.fromEntries(
        data.map(({ tag_name: version, ...release }, index) => {
            return [version, {
                ...release,
                latest: index === 0
            }]
        }).filter(([v, d]) => v != '4.9.0')
    )
    return dataObj
}

export async function fetchReleases() {
    return await (await fetch(releaseEndpoint)).json() as ReleaseData[]
}

export async function fetchLastCommitDate(): Promise<string> {
    const data = await (await fetch(repoEndpoint)).json()
    return data.pushed_at
}

export async function fetchIconsFromVersion(version: string) {
    const cleanVersion = version.replace(/^v/, '')
    const baseUrl = `https://raw.githubusercontent.com/ProCode-Software/proicons/${cleanVersion == 'development' ? 'main' : `refs/tags/${cleanVersion}`}`
    const iconsEndpoint = `${baseUrl}/icons/icons.json`
    const lockfileEndpoint = `${baseUrl}/icons/icons.lock.json`

    const icons = (await (await fetch(iconsEndpoint)).json()) as Record<string, Icon>
    const lockfile = (await (await fetch(lockfileEndpoint)).json()) as Lockfile

    return { icons, lockfile }
}

export async function fetchCodepoints(version: string) {
    const cleanVersion = version.replace(/^v/, '')
    const baseUrl = `https://raw.githubusercontent.com/ProCode-Software/proicons/${cleanVersion == 'development' ? 'main' : `refs/tags/${cleanVersion}`}`
    const codepointEndpoint = `${baseUrl}/icons/fonts/ProIcons.json`

    const codepoints = (await (await fetch(codepointEndpoint)).json()) as Codepoints
    return codepoints
}