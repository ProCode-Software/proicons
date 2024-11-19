import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar.mts'
import head from './head.mts'

const name = 'ProIcons'
const description = "A collection of 400+ modern and open-source icons"

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
        nav: [
            { text: 'Icons', link: 'icons' },
            { text: 'Guide', link: '/docs/introduction/about' },
            {
                text: 'API Reference',
                items: [
                    {
                        text: 'HTML',
                        link: '/docs/api-reference/html-api'
                    },
                    {
                        text: 'JavaScript',
                        link: '/docs/api-reference/javascript-api'
                    },
                    {
                        text: 'React',
                        link: '/docs/packages/react'
                    },
                    {
                        text: 'Roblox',
                        link: '/docs/packages/roblox'
                    },
                    {
                        text: 'Vue',
                        link: '/docs/packages/vue'
                    },
                ]
            },
        ],
        logo: {
            light: 'https://raw.githubusercontent.com/ProCode-Software/proicons/main/.github/images/logo_light.svg',
            dark: 'https://raw.githubusercontent.com/ProCode-Software/proicons/main/.github/images/logo_dark.svg',
        },

        sidebar: sidebar(),

        socialLinks: [
            { icon: 'github', link: 'https://github.com/ProCode-Software/proicons' },
            { icon: 'npm', link: 'https://npmjs.com/package/proicons' }
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024 ProCode Software'
        },
        search: {
            provider: "local"
        }
    }
})
