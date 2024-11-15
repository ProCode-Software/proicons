import { OutputOptions } from 'rollup'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json' with { type: 'json' }

const licenseNotice = `/**
 * @license ProIcons v${pkg.version} - MIT
 * 
 * This code is licensed under the MIT license.
 * See the LICENSE file in the root directory of the source tree.
 */`

const bundles: import('rollup').ModuleFormat[] = ['esm', 'cjs', 'umd']

const utilityFiles = ['renderNodes', 'rename', 'createIcon']
const functionFiles = ['replace', 'getIconInfo', 'search']

export default defineConfig({
    build: {
        target: 'es2015',
        sourcemap: false,
        minify: false,
        rollupOptions: {
            input: './src/proicons.ts',

            output: bundles.map(format => {
                return {
                    preserveModules: format == 'esm',
                    banner: licenseNotice,
                    name: 'proicons',
                    dir: `dist/${format}`,
                    format,
                    entryFileNames: ({ name }) =>
                        format == 'esm'
                            ? `${
                                  utilityFiles.includes(name)
                                      ? `utils/${name}`
                                      : functionFiles.includes(name)
                                        ? `functions/${name}`
                                        : name
                              }.js`
                            : `${name}.cjs`,
                } as OutputOptions
            }),
            preserveEntrySignatures: 'exports-only',
        },
    },

    server: {
        open: './src/test.html',
        port: 3000,
    },

    plugins: [
        dts({
            rollupTypes: true,
            outDir: 'lib',
            copyDtsFiles: true,
            exclude: [],
        }),
    ],
})
