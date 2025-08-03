import { Codepoints, Icon } from './types'
import { Lockfile } from './useLockfile'

const releaseEndpoint = 'https://api.github.com/repos/ProCode-Software/proicons/releases'
const repoEndpoint = 'https://api.github.com/repos/ProCode-Software/proicons'

export interface ReleaseAsset {
    name: string
    browser_download_url: string
}

export interface ReleaseData {
    tag_name: string
    html_url: string
    published_at: string
    prerelease: boolean
    name: string
    body: string
    assets: ReleaseAsset[]
    latest?: boolean
}

export interface VersionData {
    version: string
    lockfile: Lockfile
    icons: Record<string, Icon>
    codepoints: Codepoints
}

export async function fetchVersionList(): Promise<ReleaseData> {
    const data: ReleaseData[] = await (await fetch(releaseEndpoint)).json()

    const dataObj = Object.fromEntries(
        data
            .map(({ tag_name: version, ...release }, i) => [
                version,
                { ...release, latest: i === 0 },
            ])
            .filter(([v]) => v != '4.9.0')
    )
    return dataObj
}

export async function fetchReleases() {
    return (await (await fetch(releaseEndpoint)).json()) as ReleaseData[]
}

export async function fetchLastCommitDate(): Promise<string> {
    const data = await (await fetch(repoEndpoint)).json()
    return data.pushed_at
}

export async function fetchVersion(version: string): Promise<VersionData> {
    version = version.replace(/^v/, '')
    const baseUrl = `https://raw.githubusercontent.com/ProCode-Software/proicons/${version == 'development' ? 'main' : `refs/tags/${version}`}`

    const iconsEndpoint = `${baseUrl}/icons/icons.json`,
        lockfileEndpoint = `${baseUrl}/icons/icons.lock.json`,
        codepointEndpoint = `${baseUrl}/icons/fonts/ProIcons.json`

    const icons = (await (await fetch(iconsEndpoint)).json()) as Record<string, Icon>,
        lockfile = await (await fetch(lockfileEndpoint)).json(),
        codepoints = (await (await fetch(codepointEndpoint)).json()) as Codepoints

    return { version, icons, codepoints, lockfile: new Lockfile(lockfile, version) }
}
