import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json' with { type: 'json' }

export const licenseNotice = `/**
 * @license ProIcons Vue v${pkg.version} - MIT
 * 
 * This code is licensed under the MIT license.
 * See the LICENSE file in the root directory of the source tree.
 */`

export default defineConfig({
    server: {
        open: 'test/',
    },
    build: {
        sourcemap: false,
        minify: false,
        lib: { entry: './src/proicons-vue.ts', formats: ['es'] },
        rolldownOptions: {
            input: './src/proicons-vue.ts',
            output: {
                preserveModules: true,
                preserveModulesRoot: 'src',
                banner: licenseNotice,
                dir: `dist`,
                format: 'es',
                entryFileNames: ({ name }) =>
                    `${name.replace('src/', 'utils/').replace(/\.vue/, '')}.js`,
            },
            external: ['vue'],
        },
    },
    plugins: [vue()],
})
