// https://vitepress.dev/guide/custom-theme
import { h, Suspense } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './icons.css'
import navTitleAfter from './components/navTitleAfter.vue'
import notFound from './overrides/NotFound.vue'
import IconsSidebar from './components/icons/sidebar/IconsSidebar.vue'
import IconGrid from './components/home/IconGrid.vue'

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
            'nav-bar-title-after': () => h(navTitleAfter),
            'not-found': () => h(notFound),

            'sidebar-nav-before': () => h(IconsSidebar),

            'home-hero-image': () => h(Suspense, h(IconGrid)),
        })
    },
    enhanceApp({ app, router, siteData }) {
        // ...
    },
} satisfies Theme
