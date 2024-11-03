import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const licenseNotice = `/**
 * @license MIT
 * 
 * This code is licensed under the MIT license.
 * See the LICENSE file in the root directory of the source tree.
 */`;

/** @type {import("rollup").ModuleFormat[]} */
const bundles = ['esm', 'cjs', 'umd'];

/** @type {import("rollup").RollupOptions[]} */
const config = bundles.map((format) => ({
    input: './src/proicons.ts',
    output: {
        format,
        name: 'proicons',
        preserveModules: format == 'esm',
        banner: licenseNotice,
        sourcemapIgnoreList: (relSourcePath, mapPath) => {
            return mapPath.includes('icons/');
        },
        sourcemap: true,
        ...(format == 'esm'
            ? {
                  dir: `dist/${format}`,
              }
            : {
                  file: `dist/${format}/proicons.cjs`,
              }),
    },
    plugins: [
        esbuild({
            minify: format == 'umd',
            target: 'es6',
        }),
    ],
}));

/** @type {import("rollup").RollupOptions} */
const typesConfig = {
    input: './_lib/proicons.d.ts',
    output: {
        format: 'esm',
        file: './lib/proicons.d.ts',
    },
    plugins: [dts()],
};

export default [...config, typesConfig];
