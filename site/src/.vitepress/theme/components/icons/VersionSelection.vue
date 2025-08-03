<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDownIcon, BranchForkIcon } from "@proicons/vue";
import { BranchForkIcon as BranchForkIcon2, OpenIcon, TagIcon } from "proicons";
import { fetchLastCommitDate, fetchVersionList, ReleaseData } from "../../composables/versionData";
import Flyout from "./Flyout.vue";
import { setVersion } from "../../composables/versionSelection";

const versionData = await fetchVersionList()
const lastCommitDate = await fetchLastCommitDate()
const open = ref(false)
const selectedVersion = ref('')
const emit = defineEmits(['versionChange'])

const dateFormat: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
}
const baseLink = (v: string) => v == 'Development'
    ? `https://github.com/ProCode-Software/proicons`
    : `https://github.com/ProCode-Software/proicons/releases/tag/${v.replace(/^v/, '')}`

const text = (icon, label: string, date: string, latest: boolean) => `
${icon.toSvg({ size: 20 })}
<div class="col">
    <a>${label}</a>
    <span>
        ${new Date(date).toLocaleDateString(undefined, dateFormat)}
    </span>
</div>
${latest ? `<div class="badge">Latest</div>` : ''}
<a class="link" href="${baseLink(label)}" target="_blank">
    ${OpenIcon.toSvg({ size: 20 })}
</a>`

function set(v: string) {
    selectedVersion.value = v == 'development' ? 'Development' : `v${v}`
    setVersion(v, emit)
}

const items = Object.entries(versionData).map(([v, data]: [string, ReleaseData]) => {
    return {
        text: text(
            TagIcon,
            'v' + v,
            data.published_at,
            data.latest
        ),
        action: () => set(v),
        header: data.latest,
        default: data.latest,
        ...data
    }
})
// @ts-ignore
items.unshift({
    text: text(
        BranchForkIcon2,
        'Development',
        lastCommitDate,
        false
    ),
    action: () => set('development')
})

// Set default version
const latestVersion = Object.entries(versionData)
    .find(([v, d]) => d.latest)![0]
set(latestVersion)
</script>
<template>
    <div class="VersionSelection">
        <Flyout :items="items" v-model:open="open"
            :position="['bottom', 'right']" :selectMenu="true">
            <template #trigger="{ toggle }">
                <button class="selectionDropdown" @click="toggle">
                    <BranchForkIcon :size="22" />
                    <span>{{ selectedVersion }}</span>
                    <ChevronDownIcon class="dropdownIcon" />
                </button>
            </template>
        </Flyout>
    </div>
</template>
<style lang="scss" scoped>
.VersionSelection {
    position: relative;
}

.selectionDropdown {
    display: flex;
    align-items: center;
    padding: 10px 10px 10px 14px;
    background: var(--vp-c-bg-alt);
    border-radius: 10px;
    gap: 8px;
    font-size: 14px;
    transition: background .2s;
    position: sticky;
    font-weight: 500;
    width: 100%;
    cursor: pointer;

    &:hover,
    &:focus-within {
        background: var(--vp-c-gray-3);
    }

    &:focus-visible {
        outline: none;
        box-shadow: inset 0 0 0 1.5px var(--vp-c-brand-1);
    }

    span {
        font-weight: 500;

        @media (max-width: 700px) {
            & {
                display: none;
            }
        }
    }
}

.dropdownIcon {
    width: 18px;
    height: 18px;
    color: var(--vp-c-text-3);
}
</style>
<style lang="scss">
.VersionSelection .contextItem {
    padding-right: 8px !important;
    position: relative;

    .col {
        display: flex;
        flex-direction: column;
        gap: 3px;
        line-height: normal;
        padding-block: 6px;

        &>a {
            font-weight: 500;
            width: fit-content;
        }

        &>span {
            color: var(--vp-c-text-3);
            font-size: 13px;
        }
    }

    &:hover .link {
        opacity: 1;
    }

    .link {
        opacity: 0;
        transition: opacity .15s, background .15s;
        padding: 5px;
        position: absolute;
        right: 8px;
        border-radius: 8px;

        &:hover {
            background: var(--vp-c-default-2);
        }
    }

    &:hover,
    &.active {
        .col>span {
            color: var(--vp-c-brand-1);
        }
    }

    &:hover .badge {
        opacity: 0;
    }

    .badge {
        line-height: normal;
        border-radius: 100px;
        border: 1px solid var(--vp-c-green-3);
        padding: 3px 8px;
        color: var(--vp-c-green-1);
        margin-left: 5px;
        font-size: 13px;
        opacity: 1;
        transition: opacity .15s;
    }
}
</style>