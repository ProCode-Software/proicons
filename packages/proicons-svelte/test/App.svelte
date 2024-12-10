<script lang="ts">
import { AddSquareMultipleIcon } from '../src/icons'
import { ProIcon } from '../src/proicons-svelte'

let count: number = $state(0)

const increment = () => {
    count += 1
}
</script>

<main>
    <h1>Vite + Svelte</h1>

    <div class="card">
        <button onclick={increment}>
            count is {count}
        </button>
    </div>

    <p></p>
    <AddSquareMultipleIcon size={48} strokeWidth={2} />
    <ProIcon icon="Add" strokeWidth={2} color="red" />
</main>
