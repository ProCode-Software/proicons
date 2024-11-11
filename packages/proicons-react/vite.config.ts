import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json' with { type: 'json' }

const licenseNotice = `/**
 * @license ProIcons React v${pkg.version} - MIT
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

        rollupOptions: {
            input: './src/proicons-react.ts',

            output: {
                preserveModules: true,
                preserveModulesRoot: 'src',
                banner: licenseNotice,
                name: 'proicons',
                dir: `dist`,
                format: 'es',
                entryFileNames: ({ name }) => `${name}.js`,
            },
            preserveEntrySignatures: 'exports-only',
            external: ["react", "react-dom"]
        },
    },
    plugins: [
        react(),
        dts({
            rollupTypes: true,
            outDir: 'lib',
            copyDtsFiles: true,
            exclude: [],
        }),
    ],
})
