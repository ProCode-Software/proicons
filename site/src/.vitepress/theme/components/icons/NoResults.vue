<script setup lang="ts">
import {computed} from 'vue'
import VPButton from "vitepress/dist/client/theme-default/components/VPButton.vue";

const { query } = defineProps<{ query: string }>()

const requestUrl = computed(() => `https://github.com/ProCode-Software/proicons/discussions/new?category=icon-requests&title=[Icon%20Request]:%20${encodeURIComponent(query)}`)

</script>
<template>
    <div class="center">
        <div class="NoResultsGraphic">
            <div class="VPIcon vpi-no-results"></div>
        </div>
        <div class="text">
            <h2>No results for "{{ query }}"</h2>
            <p>However, you can request this icon on GitHub.
            </p>
        </div>
        <VPButton text="Request on GitHub" theme="alt"
            :href="requestUrl" />
    </div>

</template>
<style lang="scss" scoped>
.center {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10vh 10vw;
    gap: 20px;
    text-align: center;

    h2 {
        font-weight: 600;
        font-size: 20px;
        letter-spacing: -0.02em;
    }

    p {
        color: var(--vp-c-text-2);
    }

    .text {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

}

.NoResultsGraphic {
    font-size: 75px;
    border-radius: 50%;
    background: var(--vp-c-bg-alt);
    padding: 20px;
    color: var(--vp-c-text-2);

    .VPIcon {}
}
</style>