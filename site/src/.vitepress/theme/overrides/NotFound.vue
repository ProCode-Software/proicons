<script setup lang="ts">
import { withBase } from 'vitepress'
// vitepress/dist/client/theme-default/composables/data
import { useData } from 'vitepress/dist/client/theme-default/composables/data'
import { useLangs } from 'vitepress/dist/client/theme-default/composables/langs'

const { theme } = useData()
const { currentLang } = useLangs()
</script>

<template>
  <div class="NotFound">
    <p class="code">{{ theme.notFound?.code ?? '404' }}</p>
    <h1 class="title">{{ theme.notFound?.title ?? 'PAGE NOT FOUND' }}</h1>
    <div class="divider" />
    <blockquote class="quote">
      {{
        theme.notFound?.quote ??
        "But if you don't change your direction, and if you keep looking, you may end up where you are heading."
      }}
    </blockquote>

    <div class="action">
      <a
        class="link VPButton brand"
        :href="withBase(currentLang.link)"
        :aria-label="theme.notFound?.linkLabel ?? 'go to home'"
      >
        {{ theme.notFound?.linkText ?? 'Take me home' }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.NotFound {
  padding: 64px 24px 96px;
  text-align: center;
}

@media (min-width: 768px) {
  .NotFound {
    padding: 96px 32px 168px;
  }
}

.code {
  font-size: 100px;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.title {
  padding-top: 12px;
  line-height: 20px;
  font-size: 20px;
  font-weight: 700;
}

.divider {
  margin: 24px auto 18px;
  width: 64px;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.quote {
  margin: 0 auto;
  max-width: 256px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.action {
  padding-top: 20px;
}
</style>
