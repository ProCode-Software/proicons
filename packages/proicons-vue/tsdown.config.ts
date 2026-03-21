import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'
import { licenseNotice } from './vite.config.ts'

export default defineConfig({
    entry: ['./src/proicons-vue.ts'],
    
  platform: 'neutral',
  unbundle: true,
  plugins: [Vue({ isProduction: true })],
  banner: licenseNotice,
  dts: { vue: true },
})