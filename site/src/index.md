---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
markdownStyles: true

hero:
  name: ProIcons
  text: Friendly and modern icons
  tagline: 100% free and open-source
  image:
    light: https://raw.githubusercontent.com/ProCode-Software/proicons/main/.github/images/github-cover_light.png
    dark: https://raw.githubusercontent.com/ProCode-Software/proicons/main/.github/images/github-cover_dark.png
    width: 600
  actions:
    - theme: brand
      text: View icons
      link: /icons

    - theme: alt
      text: Get started
      link: /docs/about
      
    - theme: alt
      text: View on GitHub
      link: https://github.com/ProCode-Software/proicons

features:
  - title: Beautiful and high-quality
    icon: '<div class="vp-icon" style="--icon: url(https://raw.githubusercontent.com/ProCode-Software/proicons/main/icons/svg/sparkle.svg)"></div>'
    details: ProIcons are consistent and designed with simplicity and minimalism in mind.

  - title: Customizable
    details: Change the stroke width, corner radius and more with ease.
    icon: '<div class="vp-icon" style="--icon: url(https://raw.githubusercontent.com/ProCode-Software/proicons/main/icons/svg/color-palette.svg)"></div>'

  - title: Easy to use
    details: ProIcons are easy to import into your app and work out of the box.
    icon: '<div class="vp-icon" style="--icon: url(https://raw.githubusercontent.com/ProCode-Software/proicons/main/icons/svg/box.svg)"></div>'

  - title: Optimized and tree-shakable
    details: ProIcons libraries are tree-shakable, allowing you to import only the icons you need.
    icon: '<div class="vp-icon" style="--icon: url(https://raw.githubusercontent.com/ProCode-Software/proicons/main/icons/svg/bolt.svg)"></div>'

  - title: Framework support
    details: ProIcons are available as packages for React, Vue, Webfont, and Roblox.
    icon: '<div class="vp-icon" style="--icon: url(https://raw.githubusercontent.com/ProCode-Software/proicons/main/icons/svg/reactjs.svg)"></div>'

  - title: Free and open source
    details: All ProIcons are MIT-licensed and 100% free and open source, with zero premium icons.
    icon: '<div class="vp-icon" style="--icon: url(https://raw.githubusercontent.com/ProCode-Software/proicons/main/icons/svg/open-source.svg)"></div>'
---
<script setup>
import FrameworkList from './.vitepress/theme/components/home/FrameworkList.vue'

</script>

<FrameworkList />