import { defineConfig } from 'vite'
import type { Rollup } from 'vite'
import pkg from '../../package.json' with { type: 'json' }

const licenseNotice = `/**
 * @license ProIcons v${pkg.version} - MIT
 * 
 * This code is licensed under the MIT license.
 * See the LICENSE file in the root directory of the source tree.
 */`

const bundles: Rollup.ModuleFormat[] = ['esm', 'cjs', 'umd']

const utilityFiles = ['renderNodes', 'rename', 'createIcon']
const functionFiles = ['replace', 'getIconInfo', 'search']

export default defineConfig({
    build: {
        target: 'es2015',
        sourcemap: false,
        rollupOptions: {
            input: './src/proicons.ts',
            output: bundles.map(format => {
                return {
                    preserveModules: format == 'esm',
                    banner: licenseNotice,
                    name: 'proicons',
                    minify: format == 'umd',
                    dir: `dist/${format}`,
                    format,
                    entryFileNames({ name }) {
                        switch (true) {
                            case format != 'esm':
                                return `${name}.cjs`
                            case utilityFiles.includes(name):
                                return `utils/${name}.js`
                            case functionFiles.includes(name):
                                return `functions/${name}.js`
                            default:
                                return `${name}.js`
                        }
                    },
                } as Rollup.OutputOptions
            }),
            preserveEntrySignatures: 'exports-only',
        },
    },
    server: {
        open: './src/test.html',
        port: 3000,
    },
    plugins: [],
})
