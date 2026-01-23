import { type DefaultTheme } from 'vitepress'

const sidebar: Record<string, DefaultTheme.SidebarItem[]> = {
    docs: [
        {
            text: 'Introduction',
            collapsed: false,
            base: '/docs/',
            items: [
                { text: 'What is ProIcons?', link: 'about' },
                { text: 'Installation', link: 'installation' },
                 { text: 'Options', link: 'options' },
            ],
        },
        {
            text: 'Guides',
            collapsed: false,
            base: '/docs/',
            items: [
                { text: 'Using in Roblox', link: 'roblox-usage' },
            ],
        },
        {
            text: 'Packages',
            collapsed: false,
            base: '/docs/',
            items: [
                { text: 'HTML', link: 'html-api' },
                { text: 'Vanilla JS', link: 'javascript-api' },
                { text: 'React', link: 'react' },
                { text: 'Svelte', link: 'svelte' },
                { text: 'Vue', link: 'vue' },
                { text: 'Webfont', link: 'webfont' },
            ],
        },
        {
            text: 'Contributing',
            collapsed: false,
            base: '/docs/',
            items: [
                {
                    text: 'Design Guidelines',
                    base: '/docs/design-guidelines/',
                    link: 'index',
                    items: [
                        { text: 'Naming', link: 'naming' },
                        {
                            text: 'Designing in Figma',
                            link: 'designing-in-figma',
                        },
                    ],
                },
                { text: 'Roadmap', link: 'roadmap' }
            ],
        },
    ],
    icons: [{}],
}
export default sidebar