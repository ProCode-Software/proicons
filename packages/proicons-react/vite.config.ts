import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [react()],
    server: {
        open: true,
        port: 9000,
    },
    build: {
        rollupOptions: {
            input: resolve(__dirname, 'test/index.html'),
        }
    }
})