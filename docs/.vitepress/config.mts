import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar.mts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "ProIcons",
    description: "A collection of 400+ modern and open-source icons",
    outDir: '../site/dist/docs',
    cleanUrls: true,
    lastUpdated: true,
    lang: 'en-US',
    ignoreDeadLinks: true,
    base: '/proicons/docs/',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Icons', link: '../icons' },
            {
                text: 'API Reference',
                items: [
                    {
                        text: 'HTML',
                        link: '/api-reference/html-api'
                    },
                    {
                        text: 'JavaScript',
                        link: '/api-reference/javascript-api'
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
            { icon: 'github', link: 'https://github.com/ProCode-Software/proicon' }
        ]
    }
})
