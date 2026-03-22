import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { join } from 'path'

// https://vite.dev/config/
export default defineConfig({
    server: {
        open: '/test/',
    },
    build: {
        emptyOutDir: false,
        lib: {
            entry: join(import.meta.dirname, '../../tools/shared/shared.ts'),
            formats: ['es'],
            fileName: 'utils',
        },
    },
    plugins: [svelte()],
})