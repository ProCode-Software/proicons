import { type DefaultTheme } from 'vitepress'

export function sidebar(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Introduction',
            collapsed: false,
            base: '/docs/introduction/',
            items: [
                { text: 'What is ProIcons?', link: 'about' },
                { text: 'Installation', link: 'installation' },
            ]
        },
        {
            text: 'API Reference',
            collapsed: false,
            base: '/docs/api-reference/',
            items: [
                { text: 'HTML ProIcons API', link: 'html-api' },
                { text: 'JavaScript ProIcons API', link: 'javascript-api' },
                { text: 'Configuration', link: 'configuration' },
            ]
        },
        {
            text: 'Contributing',
            collapsed: false,
            base: '/docs/contributing/',
            items: [
                { text: 'Design Guidelines', link: 'design-guidelines' },
                { text: 'Roadmap', link: 'roadmap' },
                { text: 'Changelog', link: 'changelog' },
            ]
        }
    ]
}