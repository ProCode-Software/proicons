<script setup lang="ts">
import { withBase } from 'vitepress';
import { useData } from 'vitepress/dist/client/theme-default/composables/data';
import { useLangs } from 'vitepress/dist/client/theme-default/composables/langs'
import VPButton from './VPButton.vue';

const { theme } = useData();
const { currentLang } = useLangs();
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
            <VPButton
                tag="a"
                size="medium"
                theme="alt"
                class="link"
                :text="theme.notFound?.linkText ?? 'Take me home'"
                :href="currentLang.link"
                :aria-label="theme.notFound?.linkLabel ?? 'go to home'"
            />
        </div>
    </div>
</template>

<style scoped>
.NotFound {
    padding: 64px 24px 96px;
    text-align: center;
	line-height: normal;
}

@media (min-width: 768px) {
    .NotFound {
        padding: 96px 32px 168px;
    }
}

.code {
    font-size: 100px;
    color: var(--vp-c-text-4);
    font-weight: 600;
}

.title {
    padding-top: 12px;
    line-height: 20px;
    font-size: 20px;
    font-weight: 600;
}

.divider {
    margin: 24px auto 18px;
    width: 64px;
    height: 1px;
    background-color: var(--vp-c-divider);
}

.quote {
    margin: 0 auto;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-2);
    max-width: 450px;
    line-height: 1.5;
}

.action {
    padding-top: 20px;
}
</style>
