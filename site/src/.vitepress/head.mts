import { HeadConfig } from "vitepress"

const name = 'ProIcons'
const description = "A collection of 500+ modern and open-source icons"
const bannerUrl = 'https://raw.githubusercontent.com/ProCode-Software/proicons/main/.github/images/github-cover_light.png'
const favicon = 'https://raw.githubusercontent.com/ProCode-Software/proicons/main/.github/images/logo_light.svg'

const head: HeadConfig[] = [
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: name }],
    ['meta', { property: 'og:title', content: name }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: 'https://procode-software.github.io/proicons' }],
    ['meta', { property: 'og:image', content: bannerUrl }],
    // [ 'meta', { property: 'og:image:width', content: '1200', }, ],
    // [ 'meta', { property: 'og:image:height', content: '630', }, ],
    ['meta', { property: 'og:image:type', content: 'image/png' }],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:title', content: name }],
    ['meta', { property: 'twitter:description', content: description }],
    ['meta', { property: 'twitter:image', content: bannerUrl }],
    ['link', { rel: 'icon', href: favicon }],
]
export default head