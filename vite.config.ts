import { resolve } from "path"
import { defineConfig } from "vite"
import { createHtmlPlugin } from "vite-plugin-html"
import license from 'rollup-plugin-license'
import { dts } from 'rollup-plugin-dts'

// @ts-ignore
const config = defineConfig(({ mode }) => {
    const isProduction = mode === 'production';
    return {
        build: {
            target: 'es2015',
            sourcemap: true,
            rollupOptions: {
                plugins: isProduction
                    ? [license({
                        sourcemap: true,
                        cwd: process.cwd(),

                        banner: {
                            commentStyle: 'regular',

                            content: {
                                file: resolve('./LICENSE'),
                            }
                        }
                    })]
                    : [createHtmlPlugin({
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

const types = {
    input: resolve("./lib/proicons.d.ts"),
    output: [{ file: resolve("./lib/index.d.ts"), format: "es" }],
    plugins: [dts()],
}

export default [config, types]