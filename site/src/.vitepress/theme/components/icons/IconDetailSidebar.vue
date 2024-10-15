<script setup lang="ts">
import { computed } from "vue";
import { kebabCase } from "../../composables/rename";

interface Icon {
    category: string,
    description: string,
    icon: string
}

const { icon } = defineProps<{ icon?: [string, Icon] }>()

</script>
<template>
    <aside class="IconDetail" v-if="icon">
        <div class="iconPreviewGrid" v-html="icon[1].icon">
        </div>

        <div class="iconDetails">
            <div class="body">
                <h2 class="icon">{{ icon[0] }}</h2>
                <a class="categoryName"
                    :href="`#${kebabCase(icon[1].category)}`">
                    {{ icon[1].category }}
                </a>
            </div>
            <div class="tagList" v-if="icon[1].description">
                <span
                    v-for="tag in icon[1].description.split(',')">{{
                        tag.trim() }}</span>
            </div>
        </div>
    </aside>
</template>
<style lang="scss" scoped>
.IconDetail {
    width: 240px;
    background: var(--vp-c-bg-alt);
    border-radius: 20px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 84px;
}

@media (max-width: 700px) {
    .IconDetail {
        width: calc(100% - 40px);
        position: fixed;
        flex-direction: row;
        box-shadow: var(--vp-shadow-4);
        inset: 20px;
        border: 1px solid var(--vp-c-divider);
        top: auto;
    }
}

.iconDetails {
    padding: 20px;
    font-size: 14px;
    display: flex;
    gap: 10px;
    flex-direction: column;

    .body {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .categoryName {
        color: var(--vp-c-text-2)
    }

    h2 {
        letter-spacing: -0.02em;
        font-size: 20px;
        font-weight: 600;
    }
}

.iconPreviewGrid {
    --grid-gradient: var(--vp-c-divider),
        var(--vp-c-divider) 1px,
        transparent 1px,
        transparent calc(100% / 24);

    --fade-gradient: radial-gradient(transparent, var(--vp-c-bg-alt));

    width: 100%;
    aspect-ratio: 1/1;
    background: var(--fade-gradient),
        repeating-linear-gradient(90deg, var(--grid-gradient)),
        repeating-linear-gradient(0deg, var(--grid-gradient));

    border-bottom: 1px solid var(--vp-c-divider);
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 240px;
}

.tagList {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    &>span {
        background: var(--vp-c-default-2);
        border-radius: 10px;
        padding: 2px 8px;
        font-weight: 500;
    }
}
</style>
<style lang="scss">
.iconPreviewGrid svg {
    width: 120px;
    height: 120px;
    display: flex;
    z-index: 10;
}
</style>