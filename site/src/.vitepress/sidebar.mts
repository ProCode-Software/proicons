import { type DefaultTheme } from 'vitepress'
import { categories } from 'proicons'
import { kebabCase } from './theme/composables/rename'

export function sidebar(): Record<string, DefaultTheme.SidebarItem[]> {
    return {
        docs: [
            {
                text: 'Introduction',
                collapsed: false,
                base: '/docs/introduction/',
                items: [
                    { text: 'What is ProIcons?', link: 'about' },
                    { text: 'Installation', link: 'installation' },
                ],
            },
            {
                text: 'API Reference',
                collapsed: false,
                base: '/docs/api-reference/',
                items: [
                    { text: 'HTML API', link: 'html-api' },
                    { text: 'JavaScript API', link: 'javascript-api' },
                    { text: 'Options', link: 'options' },
                ],
            },
            {
                text: 'Packages',
                collapsed: false,
                base: '/docs/packages/',
                items: [
                    { text: 'ProIcons React', link: 'react' },
                    { text: 'ProIcons Roblox', link: 'roblox' },
                    { text: 'ProIcons Vue', link: 'vue' },
                    { text: 'ProIcons Webfont', link: 'webfont' },
                ],
            },
            {
                text: 'Contributing',
                collapsed: false,
                base: '/docs/contributing/',
                items: [
                    {
                        text: 'Design Guidelines',
                        base: '/docs/contributing/design-guidelines/',
                        link: 'index',
                        collapsed: true,
                        items: [
                            { text: 'Naming', link: 'naming' },
                            {
                                text: 'Designing in Figma',
                                link: 'designing-in-figma',
                            },
                        ],
                    },
                    { text: 'Roadmap', link: 'roadmap' },
                    { text: 'Changelog', link: 'changelog' },
                ],
            },
        ],
        icons: [{}],
    }
}
