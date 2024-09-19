import { resolve } from "path"
import { ModuleFormat, OutputOptions } from "rollup"
import { defineConfig } from "vite"
import { createHtmlPlugin } from "vite-plugin-html"

const types: ModuleFormat[] = ['umd', 'esm', 'cjs']
const outputs = types.map((output) => {
    const config: OutputOptions = {
        format: output,
        dir: `dist/${output}`,
        entryFileNames: `[name].${output !== 'esm' ? 'c' : ''}js`,
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
                input: {
                    proicons: resolve('src/proicons.ts'),
                },
                output: outputs,
                plugins: isProduction ? [] : [createHtmlPlugin({
                    template: resolve('src/test.html'),
                    entry: resolve('src/proicons.ts'),
                })]
            },
            lib: {
                entry: resolve(__dirname, 'src/proicons.ts'),
                name: 'proicons',
                formats: ['es', 'umd', 'cjs'],
            },
        },
        server: {
            open: true,
            port: 3000
        }
    }
})