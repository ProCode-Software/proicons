<script setup lang="ts">
import { computed } from "vue";
import { kebabCase } from "../../composables/rename";
import VPButton from "vitepress/dist/client/theme-default/components/VPButton.vue";
import { data as versionData } from '../fetchVersion.data'
import { data as lockfile } from '../../../data/fetchLockfile.data'
import IconDetailFlyout from "./IconDetailFlyout.vue";

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
                <h2 class="icon">
                    {{ icon[0] }}

                    <div class="right">
                        <button
                            class="infoButton flyoutButton flyout-right"
                            title="View info">
                            <span
                                class="VPIcon vpi-info"></span>

                            <IconDetailFlyout :icon="icon[0]" />
                        </button>
                    </div>
                </h2>
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

            <div class="iconAction">
                <VPButton text="View code" theme="alt" />
                <VPButton text="Copy" theme="alt" />
                <VPButton text="Download" theme="alt" />
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
        box-shadow: var(--vp-shadow-3);
        inset: 20px;
        border: 1px solid var(--vp-c-divider);
        top: auto;

        .iconPreviewGrid {
            border-radius: 20px 0 0 20px;
            border-bottom: none;
        }
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
        display: flex;
        gap: 8px;
        align-items: center;
        justify-content: space-between;
    }
}

.dark .iconPreviewGrid {
    --fade-gradient: radial-gradient(rgb(0, 0, 0, .1),
            var(--vp-c-bg-alt) 70%);
}

.iconPreviewGrid {
    --grid-gradient: var(--vp-c-divider),
        var(--vp-c-divider) 1px,
        transparent 1px,
        transparent calc(100% / 24);

    --fade-gradient: radial-gradient(rgb(255, 255, 255, .1),
            var(--vp-c-bg-alt) 70%);

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
    border-radius: 20px 20px 0 0;
}

.tagList {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.tagList>span,
.badge {
    background: var(--vp-c-default-2);
    border-radius: 10px;
    padding: 2px 8px;
    font-weight: 500;
}

.infoButton {
    font-size: 20px;
    display: flex;
    color: var(--vp-c-text-2);
    transition: background .15s, box-shadow .15s;
    border-radius: 100px;

    &:hover {
        background: var(--vp-c-gray-2);
        box-shadow: 0 0 0 6px var(--vp-c-gray-3);
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

.dark svg {
    color: #fff;
}

.flyoutButton {
    position: relative;

    &:focus .flyout {
        display: flex;
    }

    .flyout {
        display: none;
        position: absolute;
        top: calc(100% + 10px);
        border: 1px solid var(--vp-c-divider);
        border-radius: 15px;
        background-color: var(--vp-c-bg-elv);
        max-height: calc(var(--vp-vh, 100vh) - 86px);
        overflow: hidden auto;
        box-shadow: var(--vp-shadow-3);
        padding: 10px;
        flex-direction: column;
        z-index: 10;
        animation: flyoutshow 0.2s cubic-bezier(0.01, 0.37, 0.54, 1.01);
    }

    &.flyout-right .flyout {
        right: 0;
    }
}

@keyframes flyoutshow {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
}
</style>