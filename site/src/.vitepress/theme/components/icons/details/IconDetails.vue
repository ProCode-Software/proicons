<script setup lang="ts">
import { computed } from "vue";
import { kebabCase } from "../../../composables/rename";
import { Codepoints, Icon, IconEntry, Lockfile } from '../../../composables/types';
import IconActions from './IconActions.vue';
import IconSideDetails from "./IconSideDetails.vue";

const { icon, lockfile, codepoints } = defineProps<{
    icon?: IconEntry,
    lockfile: Lockfile,
    codepoints: Codepoints
}>()

const name: string = computed(() => icon[0])
const iconData: Icon = computed(() => icon[1])

</script>
<template>
    <aside class="IconDetail" v-if="icon">
        <div class="iconPreviewGrid"
            v-html="iconData.icon" />

        <div class="iconDetails">
            <div class="body">
                <h2 class="icon">{{ name }}</h2>
                <span class="categoryName">
                    <a
                        :href="`#${kebabCase(iconData.category)}`">
                        {{ iconData.category }}
                    </a>
                </span>
            </div>
            <div class="right">
                <IconSideDetails :icon="name" :lockfile="lockfile" :codepoints="codepoints" />
            </div>
        </div>
        <div class="tagList">
            <span v-if="iconData.description"
                v-for="tag in iconData.description.split(',')">{{
                    tag.trim() }}</span>
        </div>
        <IconActions :icon="icon" :codepoints="codepoints" />
    </aside>
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
    grid-template-areas: "a b b" "a c c" "a d d";
    gap: 15px 20px;
    grid-template-columns: 200px auto auto;
    animation: showDetails .2s cubic-bezier(0.01, 0.33, 0.33, 0.99);

    @media (max-width: 700px) {
        & {
            width: calc(100% - 40px);
            inset: 20px;
            top: auto;
            min-width: auto;
            grid-template-areas: "a b" "c c" "d d";
            grid-template-columns: 100px auto;
            padding: 20px;

            &>* {
                padding: 0 !important;
            }
        }
    }
}

@keyframes showDetails {
    from {
        opacity: 0;
        transform: translateY(20%);
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
        gap: 8px;
        align-items: center;
        justify-content: space-between;
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
        transparent calc(100% / 24);
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

    @media (max-width: 700px) {
        & {
            justify-self: center;
            border: none;
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
    margin-block: auto;
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
</style>