<script setup lang="ts">
import { computed } from "vue";
import { kebabCase } from "../../composables/rename";
import VPButton from "vitepress/dist/client/theme-default/components/VPButton.vue";
import { data as versionData } from '../fetchVersion.data'
import { data as lockfile } from '../../../data/fetchLockfile.data'
import IconDetailFlyout from "./IconDetailFlyout.vue";
import { Icon } from '../../composables/types'
import IconActionFlyout from "./IconActionFlyout.vue";

const { icon } = defineProps<{ icon?: [string, Icon] }>()

const name: string = computed(() => icon[0])
const iconData: Icon = computed(() => icon[1])

</script>
<template>
    <aside class="IconDetail" v-if="icon">
        <div class="iconPreviewGrid" v-html="iconData.icon">
        </div>

        <div class="iconDetails">
            <div class="body">
                <h2 class="icon">
                    {{ name }}

                    <div class="right">
                        <button
                            class="infoButton flyoutButton flyout-right"
                            title="View info">
                            <span
                                class="VPIcon vpi-info"></span>

                            <IconDetailFlyout
                                :icon="name" />
                        </button>
                    </div>
                </h2>
                <a class="categoryName"
                    :href="`#${kebabCase(iconData.category)}`">
                    {{ iconData.category }}
                </a>
            </div>
            <div class="tagList"
                v-if="iconData.description">
                <span
                    v-for="tag in iconData.description.split(',')">{{
                        tag.trim() }}</span>
            </div>
        </div>
        <div class="iconActions">
            <button
                class="VPButton medium alt flyoutButton flyout-left-center">
                View code
            </button>
            <button
                class="VPButton medium alt flyoutButton flyout-left-center">
                Copy
                <span
                    class="VPIcon vpi-chevron-down"></span>
                <IconActionFlyout :icon="icon"
                    mode="copy" />
            </button>
            <button
                class="VPButton medium alt flyoutButton flyout-left-center">
                Download
                <span
                    class="VPIcon vpi-chevron-down"></span>
                <IconActionFlyout :icon="icon"
                    mode="download" />
            </button>
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

    &:hover,
    &:focus {
        background: var(--vp-c-gray-2);
        box-shadow: 0 0 0 6px var(--vp-c-gray-3);
    }
}

.iconActions {
    padding: 20px;
    font-size: 14px;
    display: flex;
    gap: 8px;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    border-top: 1px solid var(--vp-c-divider);

    .VPButton {
        background: var(--vp-c-gray-2);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;

        &:hover {
            background: var(--vp-c-gray-1)
        }

        .VPIcon {
            width: 20px;
            height: 20px;
            display: flex;
        }
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

    &:focus .flyout, &.focus-within .flyout {
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

    &.flyout-left-center .flyout {
        right: calc(100% + 10px);
        top: 50%;
        transform: translateY(-50%);
        animation-name: flyoutshow_left;
    }
}

@keyframes flyoutshow {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
}
@keyframes flyoutshow_left {
    from {
        opacity: 0;
        transform: translateX(10px) translateY(-50%)
    }
}

.flyout.flyout-context-menu {
    gap: 4px;
    padding: 12px;

    .contextItem {
        line-height: normal;
        display: block;
        border-radius: 6px;
        padding: 0 12px;
        line-height: 32px;
        font-size: 14px;
        font-weight: 500;
        color: var(--vp-c-text-1);
        white-space: nowrap;
        transition: background-color 0.25s, color 0.25s;
        text-align: left;

        &:hover {
            color: var(--vp-c-brand-1);
            background-color: var(--vp-c-default-soft);
        }
    }
}
</style>