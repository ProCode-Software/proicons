import { resolve } from 'path';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import license from 'rollup-plugin-license';
import dts from 'vite-plugin-dts';

const licenseNotice = `/**
 * @license MIT
 * 
 * This code is licensed under the MIT license.
 * See the LICENSE file in the root directory of the source tree.
 */`

const config = defineConfig(({ mode }) => {
    return {
        build: {
            target: 'es2015',
            sourcemap: true,

            lib: {
                entry: resolve(__dirname, 'src/proicons.ts'),
                name: 'proicons',
                formats: ['es', 'umd', 'cjs'],
                fileName: (format) => `${format == 'es' ? 'esm' : format}/proicons.${format == 'es' ? 'js' : 'cjs'}`,

                plugins: [
                    [
                        license({
                            sourcemap: true,
                            cwd: process.cwd(),
                            banner: {
                                commentStyle: 'regular',
                                content: {
                                    file: resolve('./LICENSE'),
                                },
                            },
                        }),
                    ],
                ],
            },
            rollupOptions: {
                input: [resolve('./src/proicons.ts')],
                output: {
                    preserveModules: true,
                    preserveModulesRoot: './src/icons',
                    banner: licenseNotice
                }
            },
        },
        server: {
            open: './src/test.html',
            port: 3000,
        },
        plugins: [
            dts({
                rollupTypes: true,
                outDir: resolve('./lib'),
                exclude: '**/src/icons',
                copyDtsFiles: true,
            }),
        ],
    };
});

export default config;