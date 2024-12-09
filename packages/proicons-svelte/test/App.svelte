<script lang="ts">
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

    <p>
        Check out <a
            href="https://github.com/sveltejs/kit#readme"
            target="_blank"
            rel="noreferrer">SvelteKit</a
        >, the official Svelte app framework powered by Vite!
    </p>

    <p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>
</main>
