<script lang="ts">
import { AddSquareMultipleIcon, AddIcon, TvIcon } from '../src/icons'
import { ProIcon } from '../src/proicons-svelte'

let count: number = $state(0)

const increment = () => {
    count += 1
}
</script>

<main>
    <h1>ProIcons Svelte Test</h1>

    <div class="card">
        <button onclick={increment}>
            count is {count}
        </button>
    </div>

    <p></p>
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
</main>
