import { resolve } from 'path';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import license from 'rollup-plugin-license';
import dts from 'vite-plugin-dts';

const types = {
    input: resolve('./lib/proicons.d.ts'),
    output: [{ file: resolve('./lib/index.d.ts'), format: 'es' }],
    plugins: [dts()],
};

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

                plugins: [[
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
                ]]
            },
            rollupOptions: {
                
            },
        },
        server: {
            open: './src/test.html',
            port: 3000,
        },
        plugins: [dts({ rollupTypes: true })],
    };
});

export default config;
