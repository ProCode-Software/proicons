import typescript from '@rollup/plugin-typescript';

/** @type {import("rollup").ModuleFormat[]} */
const bundles = ['esm', 'cjs', 'umd']

/** @type {import("rollup").RollupOptions} */
const config = bundles.map((format) => ({
    input: './src/proicons.ts',
    output: {
        format,
        name: 'proicons',
        dir: `dist/${format}/proicons.${format == 'esm' ? '' : 'c'}js`,
        
    },
    plugins: [typescript({ exclude: ['icons/*'] })]
}))

/** @type {import("rollup").RollupOptions} */
const typesConfig = {
    input: './src/proicons.ts',
    output: {
        format: 'esm',
        dir: 'lib'
    },
    plugins: [typescript({ exclude: ['icons/*'] })]
}

export default [...config, typesConfig]