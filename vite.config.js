import { resolve } from "path"
import { defineConfig } from "vite"
import { createHtmlPlugin } from "vite-plugin-html"

const outputs = ['umd', 'esm', 'cjs'].map((output) => {
    /** @type {import("rollup").OutputOptions} */
    const config = {
        format: output,
        dir: `dist/${output}`,
        entryFileNames: '[name].js',
        exports: 'named'
    }
    if (output === 'umd') {
        config.name = 'proicons'
    }
    return config
})

export default defineConfig(({ mode }) => {
    const isProduction = mode === 'production';
    return {
        build: {
            target: 'es2015',
            sourcemap: true,
            rollupOptions: {
                // https://rollupjs.org/configuration-options/


                plugins: isProduction ? [] : [createHtmlPlugin({
                    template: resolve('src/test.html'),
                    entry: resolve('src/proicons.ts'),
                })]
            },
            lib: {
                entry: resolve(__dirname, 'src/proicons.ts'),
                name: 'proicons',
                formats: ['es', 'umd', 'cjs'],
                fileName: resolve('dist/[format]/proicons')
            },
        },
        server: {
            open: true,
            port: 3000
        }
    }
})