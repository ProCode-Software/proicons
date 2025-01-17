import { defineConfig } from 'vitepress'
import sidebar from './sidebar.mts'
import head from './head.mts'
import nav from './nav.mts'

const name = 'ProIcons'
const description = "A collection of 400+ modern and open-source icons"

const socialLinks = [
    { name: 'GitHub', icon: 'github', link: 'https://github.com/ProCode-Software/proicons'},
    { name: 'X (Twitter)', icon: 'x', link: 'https://x.com/ProCode-Software'},
    { name: 'Bluesky', icon: 'bluesky', link: 'https://bsky.app/profile/procodesoftware.bsky.social'},
]

function getSocialLinks() {
    return socialLinks.map(({name, icon, link}) => {
        return `
        <a href="${link}" target="_blank" aria-label="${name}" title="${name}">
            <span class="VPIcon vpi-social-${icon}"></span>
        </a>`
    }).join('')
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: name,
    description: description,
    outDir: '../dist',
    cleanUrls: true,

    lastUpdated: true,
    lang: 'en-US',
    ignoreDeadLinks: true,
    base: '/proicons/',
    head,
    markdown: {
        container: {
            tipLabel: 'Tip',
            warningLabel: 'Warning',
            dangerLabel: 'Danger',
            infoLabel: 'Info',
        }
    },
    rewrites(id) {
        return id.replace(/^docs\/([^/]+)\//, 'docs/')
    },
    sitemap: {
        hostname: 'https://procode-software.github.io/proicons'
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        editLink: {
            pattern: 'https://github.com/ProCode-Software/proicons/edit/main/site/src/:path'
        },
        outline: 'deep',
        notFound: {
            linkText: 'Go home',
            title: 'We couldn\'t find the page you were looking for'
        },
        nav,
        sidebar,
        logo: {
            light: 'https://raw.githubusercontent.com/ProCode-Software/proicons/main/.github/images/logo_light.svg',
            dark: 'https://raw.githubusercontent.com/ProCode-Software/proicons/main/.github/images/logo_dark.svg',
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/ProCode-Software/proicons' },
            { icon: 'npm', link: 'https://npmjs.com/package/proicons' }
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: `Copyright © ${new Date().getFullYear()} ProCode Software<br>${getSocialLinks()}`
        },
        search: {
            provider: "local"
        }
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler'
                }
            }
        }
    }
})
