import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar.mts'

const icon = ''
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
    head: [
        [ 'meta', { property: 'og:locale', content: 'en_US', }, ],
        [ 'meta', { property: 'og:type', content: 'website',}, ],
        [ 'meta', { property: 'og:site_name', content: name, }, ],
        [ 'meta', { property: 'og:title', content: name, }, ],
        [ 'meta', { property: 'og:description', content: description, }, ],
        [ 'meta', { property: 'og:url', content: 'https://procode-software.github.io/proicons', }, ],
        [ 'meta', { property: 'og:image', content: 'imageurl', }, ],
        // [ 'meta', { property: 'og:image:width', content: '1200', }, ],
        // [ 'meta', { property: 'og:image:height', content: '630', }, ],
        [ 'meta', { property: 'og:image:type', content: 'image/png', }, ],
        [ 'meta', { property: 'twitter:card', content: 'summary_large_image', }, ],
        [ 'meta', { property: 'twitter:title', content: name, }, ],
        [ 'meta', { property: 'twitter:description', content: description, }, ],
        [ 'meta', { property: 'twitter:image', content: 'imageurl', }, ],
        ['link', { rel: 'icon', href: 'favicon' }]
    ],
    markdown: {
        container: {
            tipLabel: 'Tip',
            warningLabel: 'Warning',
            dangerLabel: 'Danger',
            infoLabel: 'Info',
        }
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
                    }
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
