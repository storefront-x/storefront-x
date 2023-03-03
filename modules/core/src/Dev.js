import path from 'node:path'
import fs from 'node:fs/promises'
import * as vite from 'vite'
import { createApp, eventHandler, fromNodeMiddleware } from 'h3'
import consola from 'consola'
import Youch from 'youch'
import Core from './Core.js'
import process from 'node:process'

export default class Dev extends Core {
  async createServer() {
    const viteConfig = this.buildConfig({
      appType: 'custom',
      server: { middlewareMode: true },
      clearScreen: false,
      root: this.buildDir,
      logLevel: process.env.NODE_ENV === 'test' ? 'silent' : undefined,
    })

    const viteDevServer = await vite.createServer(viteConfig)

    const app = createApp()

    await this._loadServerMiddleware(app, viteDevServer)

    app.use(fromNodeMiddleware(viteDevServer.middlewares))

    process.on('unhandledRejection', (reason) => {
      consola.error(reason)
    })

    app.use(
      eventHandler(async (event) => {
        const index = await fs.readFile(path.join(this.buildDir, 'index.html'), { encoding: 'utf-8' })
        const template = await viteDevServer.transformIndexHtml(event.path, index)

        // Loads entry.server.ts from the .sfx directory
        const { default: entry } = await viteDevServer.ssrLoadModule('/entry.server.ts')

        try {
          const response = await this.handleRequest({
            event,
            entry,
            template,
          })

          return response
        } catch (e) {
          viteDevServer.ssrFixStacktrace(e)

          // TODO: Investigate why Vite doesn't fix the stack properly
          if (typeof e.stack === 'string') {
            e.stack = e.stack.replace(/\/@fs\//g, '/')
          }

          const youch = new Youch(e, event.node.req)
          const html = await youch.toHTML()

          return html
        }
      }),
    )

    return app
  }

  async _loadServerMiddleware(app, viteDevServer) {
    app.use(
      eventHandler(async (event) => {
        const { default: middlewares } = await viteDevServer.ssrLoadModule('/server/middleware.ts', {
          fixStacktrace: true,
        })

        for (const middleware of Object.values(middlewares)) {
          const response = await middleware(event)
          if (response) return response
        }
      }),
    )
  }
}
