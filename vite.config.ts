import { resolve } from "path"
import { defineConfig } from "vite"
import { createHtmlPlugin } from "vite-plugin-html"

// @ts-ignore
export default defineConfig(({ mode }) => {
    const isProduction = mode === 'production';
    return {
        build: {
            target: 'es2015',
            sourcemap: true,
            rollupOptions: {
                plugins: isProduction ? [] : [createHtmlPlugin({
                    template: resolve('src/test.html'),
                    entry: resolve('src/proicons.ts'),
                })]
            },
            lib: {
                entry: resolve(__dirname, 'src/proicons.ts'),
                name: 'proicons',
                formats: ['es', 'umd', 'cjs'],
                fileName: (format) => `${format == 'es' ? 'esm' : format}/proicons.${format == 'es' ? 'js' : 'cjs'}`
            },
        },
        server: {
            open: './src/test.html',
            port: 3000
        }
    }
})