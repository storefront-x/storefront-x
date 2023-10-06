import path from 'node:path'
import { defineConfig } from 'vite'

export default (core) =>
  defineConfig({
    resolve: {
      alias: {
        '#ioc': path.resolve(core.buildDir, 'ioc'),
        '~': core.rootDir,
      },
    },
    build: {
      rollupOptions: {
        output: {
          format: 'es',
          experimentalMinChunkSize: 10_000, // 10kb
        },
      },
    },
  })
