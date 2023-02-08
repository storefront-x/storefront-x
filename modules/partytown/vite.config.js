import { defineConfig } from 'vite'
import path from 'node:path'
import { partytownVite } from '@builder.io/partytown/utils'

export default (core) =>
  defineConfig({
    plugins: [
      partytownVite({
        dest: path.join(core.buildDir, '.dist/client/~partytown'),
      }),
    ],
  })
