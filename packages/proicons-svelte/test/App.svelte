<script lang="ts">
import { AddSquareMultipleIcon, AddIcon, TvIcon, BrainIcon } from '../src/icons'
import { ProIcon } from '../src/proicons-svelte'

let size = $state(48)
const randomIcons = ['Photo', 'Search', 'Cheese', 'Toast', 'Save']
const getRandomIcon = () => randomIcons[Math.floor(Math.random() * randomIcons.length)]
let iconName = $state(getRandomIcon())
</script>

<main>
    <h1>ProIcons Svelte Test</h1>

    <AddSquareMultipleIcon size={48} strokeWidth={2} class="myClass" />
    <ProIcon icon="Add" strokeWidth={2} color="red" />

    <!-- Test for https://github.com/ProCode-Software/proicons/issues/5 -->
    <div style="color: green">
        <AddIcon color="red" />
        <TvIcon />
    </div>
    <div style="color: blue">
        <AddIcon />
        <TvIcon />
    </div>
    <h2>Dynamic icons</h2>
    Size:<input type="range" bind:value={size} min="24" max="72" />
    <br />
    <ProIcon icon="Search Cancel" {size} />
    <BrainIcon {size} />
    <br>
    <ProIcon icon={iconName} {size} />
    <button onclick={() => iconName = getRandomIcon()}>Random Icon</button>
</main>
