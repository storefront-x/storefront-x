import path from 'node:path'
import * as vite from 'vite'
import open from 'open'
import { visualizer } from 'rollup-plugin-visualizer'
import Core from './Core.js'

export default class Build extends Core {
  async build() {
    const { analyze, minify } = this.argv

    const clientConfig = this.buildConfig({
      clearScreen: false,
      root: this.buildDir,
      build: {
        minify,
        ssrManifest: true,
        outDir: path.join(this.distDir, 'client'),
        emptyOutDir: false,
        rollupOptions: {
          output: {
            entryFileNames: 'assets/[hash].js',
            chunkFileNames: 'assets/[hash].js',
            assetFileNames: (asset) => {
              if (asset.name?.endsWith('.css')) {
                return 'assets/[hash][extname]'
              } else {
                // There's a bug in Vite that requires name in non CSS assets
                return 'assets/[name].[hash][extname]'
              }
            },
          },
          plugins: [
            //@ts-ignore
            analyze &&
              visualizer({
                filename: path.join(this.distDir, 'client', 'stats.html'),
              }),
          ],
        },
      },
    })

    await vite.build(clientConfig)

    if (analyze) {
      open(path.join(this.distDir, 'client', 'stats.html'))
    }

    const serverConfig = this.buildConfig({
      clearScreen: false,
      root: this.buildDir,
      build: {
        ssr: 'entry.server.ts',
        outDir: path.join(this.distDir, 'server'),
        emptyOutDir: false,
        rollupOptions: {
          onwarn: (msg) => {
            if (msg.code === 'UNUSED_EXTERNAL_IMPORT') return

            console.warn(msg)
          },
        },
      },
    })

    await vite.build(serverConfig)

    // TODO: Think of a better way for bundling server code?
    await vite.build(
      this.buildConfig({
        clearScreen: false,
        build: {
          rollupOptions: {
            input: [
              path.join(this.buildDir, 'server', 'middleware.ts'),
              path.join(this.buildDir, 'server', 'routes.ts'),
            ],
          },
          ssr: true,
          outDir: path.join(this.distDir, 'server'),
          emptyOutDir: false,
        },
        optimizeDeps: {
          include: [],
        },
      }),
    )
  }
}
