import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
    server: {
        open: '/test/',
    },
    /* build: {
        emptyOutDir: false,
        lib: {
            entry: './src/utils.ts',
            fileName: 'utils',
            formats: ['es']
        },
    }, */
    plugins: [svelte()],
})
