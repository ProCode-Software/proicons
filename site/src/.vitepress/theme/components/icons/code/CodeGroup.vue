<script setup lang="ts">
import { createHighlighter } from 'shiki'
import { computed, ref } from 'vue'

const randomBytes = () => Math.floor(Math.random() * 10 ** 11).toString(36)

type CodeGroupItems = {
    label: string
    code: string
    language: string
    entry?: string
}[]
const { items } = defineProps<{ items: CodeGroupItems }>()
const activeItem = ref(0)
const groupId = `group-${randomBytes()}`

const tabs = computed(() =>
    items.map(({ label }) => {
        return { label, id: `tab-${randomBytes()}` }
    })
)
const blocks = computed(() => items.map(({ code, language }) => ({ code, language })))

const highlighter = await createHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: items.map(({ language }) => language),
})

function highlight(block: { code: string; language: any }) {
    const highlighted = highlighter
        .codeToHtml(block.code, {
            lang: block.language,
            themes: {
                light: 'github-light',
                dark: 'github-dark',
            },
            defaultColor: false,
        })
        .replace(/shiki-themes/, '$& vp-code')
        .replace(/style=".*?"/, '')

    return `
    <button title="Copy Code" class="copy"></button>
    <span class="lang">${block.language}</span>
    ${highlighted}
    `
}
</script>
<template>
    <div class="vp-code-group vp-adaptive-theme">
        <div class="tabs">
            <template v-for="{ label, id } in tabs">
                <input type="radio" :name="groupId" :id="id" />
                <label :data-title="label" :for="id">{{ label }}</label>
            </template>
        </div>
        <div class="blocks">
            <div
                v-for="(block, index) in blocks"
                :key="index"
                :class="[
                    `language-${block.language}`,
                    'vp-adaptive-theme',
                    { active: activeItem === index },
                ]"
                v-html="highlight(block)"
            ></div>
        </div>
    </div>
</template>
<style scoped lang="scss"></style>
