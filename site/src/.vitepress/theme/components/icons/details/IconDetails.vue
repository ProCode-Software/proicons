<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { kebabCase } from "../../../composables/rename";
import { Codepoints, Icon, IconEntry, Lockfile } from '../../../composables/types';
import IconActions from './IconActions.vue';
import IconSideDetails from "./IconSideDetails.vue";
import CodeDrawer from "../code/CodeDrawer.vue";
import { CancelIcon, AlertCircleIcon } from "@proicons/vue";
import { useSvgVariables, customizationData } from "../../../composables/useCustomizations";
import { getDeprecationData } from "../../../composables/useDeprecationData";

const { icon, lockfile, codepoints } = defineProps<{
    icon?: IconEntry,
    lockfile: Lockfile,
    codepoints: Codepoints
}>()

const name = computed<string>(() => icon[0])
const iconData = computed<Icon>(() => icon[1])
const codeDrawerShown = ref(false)
const hidden = ref(!!icon)

function toggleDrawer() {
    codeDrawerShown.value = !codeDrawerShown.value
}
watch(() => icon, () => {
    hidden.value = false
})
const svg = computed(() => useSvgVariables(iconData.value.icon, customizationData))
const deprecationData = computed(() => getDeprecationData(name.value, lockfile))

const deprecationMessage = (data: typeof deprecationData.value) =>
    `This icon was deprecated in v${data.version} and will be removed in a later version.`
        + (data.alternative ? ` Please use ${data.alternative} instead.` : ``)
</script>
<template>
    <Transition name="details">
        <aside :class="['IconDetail', { withDrawer: codeDrawerShown }]"
            v-if="icon && lockfile.icons.find(({name: i}) => i == name)" v-show="!hidden">
            <div class="closeButtonWrapper">
                <button class="closeButton" @click="hidden = true" title="Close">
                <CancelIcon :size="20" />
            </button>
            </div>
            <div class="iconPreviewGrid"
                v-html="svg" :style="{
                    '--grid-size': customizationData.size
                }" />
            <div class="iconDetails">
                <div class="body">
                    <h2 class="icon">
                        {{ name }}
                        <div v-if="deprecationData" class="deprecationBanner"
                            :title="deprecationMessage(deprecationData)">
                            <AlertCircleIcon :size="20" />
                            Deprecated
                        </div>
                    </h2>
                    <span class="categoryName">
                        <a :href="`#${kebabCase(iconData.category)}`">
                            {{ iconData.category }}
                        </a>
                    </span>
                </div>
                <div class="right">
                    <IconSideDetails :icon="name"
                        :lockfile="lockfile"
                        :codepoints="codepoints" />
                </div>
            </div>
            <div class="tagList">
                <span v-if="iconData.description"
                    v-for="tag in iconData.description.split(',')">{{
                        tag.trim() }}</span>
            </div>
            <IconActions :icon="icon"
                :codepoints="codepoints"
                @showDrawer="toggleDrawer" />
            <CodeDrawer :visible="codeDrawerShown" :icon="name" />
        </aside>
    </Transition>
</template>
<style lang="scss" scoped>
.IconDetail {
    width: 40vw;
    background: var(--vp-c-bg-alt);
    border-radius: 20px;
    flex-shrink: 0;
    display: grid;
    position: fixed;
    right: 40px;
    min-width: 600px;
    bottom: 40px;
    border: 1px solid var(--vp-c-divider);
    box-shadow: var(--vp-shadow-3);
    grid-template-areas: "a b b" "a c c" "a d d" "e e e";
    gap: 15px 20px;
    grid-template-columns: 200px 1fr 1fr;

    &.details-enter-active,
    &.details-leave-active {
        transition: .2s cubic-bezier(0.01, 0.33, 0.33, 0.99);
    }
    &.details-leave-active {
        transition-duration: .15s;
    }
    &.details-enter-from,
    &.details-leave-to {
        opacity: 0;
        transform: translateY(20%);
    }
    &.details-enter-to,
    &.details-leave-from {
        opacity: 1;
    }

    @media (max-width: 700px) {
        & {
            width: calc(100% - 40px);
            inset: 20px;
            top: auto;
            min-width: auto;
            grid-template-areas: "a b" "c c" "d d" "e e";
            grid-template-columns: 120px 1fr;
        }
    }
}

.iconDetails {
    padding: 20px 20px 0 0;
    font-size: 14px;
    display: flex;
    gap: 20px;
    align-items: flex-start;
    grid-area: b;

    .body {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
    }

    .categoryName a {
        color: var(--vp-c-text-2);
        transition: color .15s;

        &:hover {
            color: var(--vp-c-brand-1);
        }
    }

    h2 {
        letter-spacing: -0.02em;
        font-size: 20px;
        font-weight: 600;
        display: flex;
        gap: 10px;
        align-items: center;
    }

    @media (max-width: 700px) {
        & {
            width: 100%;
            flex-direction: column;
        }
    }
}

.right {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 160px;

    @media (max-width: 700px) {
        & {
            width: 100%;
            gap: 6px;
        }
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
        transparent calc(100% / var(--grid-size));
    --fade-gradient: radial-gradient(rgb(255, 255, 255, .1),
            var(--vp-c-bg-alt) 70%);
    background: var(--fade-gradient),
        repeating-linear-gradient(90deg, var(--grid-gradient)),
        repeating-linear-gradient(0deg, var(--grid-gradient));

    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 20px 0 0 20px;
    border-right: 1px solid var(--vp-c-divider);
    grid-area: a;
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--customize-color, inherit);

    @media (max-width: 700px) {
        & {
            justify-self: center;
            border: none;
            margin-left: 20px;
            width: calc(100% - 20px);
        }
    }
}

.tagList {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    grid-area: c;
    padding-right: 20px;
    font-size: 14px;
    min-height: 30px;
    align-items: center;

    @media (max-width: 700px) {
        & {
            width: 100%;
            padding: 0 20px;
            min-height: auto;
        }
    }
}

.tagList>span,
.badge {
    background: var(--vp-c-default-3);
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

.closeButtonWrapper {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 20%;
    aspect-ratio: 4 / 3;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;

    &:hover .closeButton {
        opacity: 1;
    }

    .closeButton {
        transition: .15s;
        border-radius: 8px;
        padding: 8px;
        opacity: 0;
        background: var(--vp-c-bg);
        border: 1px solid var(--vp-c-divider);

        &:hover {
            background: var(--vp-c-default-2);
        }

        @media (max-width: 700px) {
            & {
                opacity: 1;
                background: var(--vp-c-bg-alt);
            }
        }
    }
}
</style>
<style lang="scss">
.iconPreviewGrid svg {
    width: 100%;
    height: 100%;
    display: flex;
}
.dark .iconPreviewGrid svg {
    color: #fff;
}

.deprecationBanner {
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--vp-c-warning-1);
    font-weight: 500;
    letter-spacing: normal;
}
</style>