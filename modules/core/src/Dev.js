import path from 'node:path'
import fs from 'node:fs/promises'
import * as vite from 'vite'
import { createApp, eventHandler, fromNodeMiddleware, createRouter, setResponseStatus } from 'h3'
import consola from 'consola'
import Youch from 'youch'
import Core from './Core.js'
import process from 'node:process'
import serverStatic from 'serve-static'
import getPort from 'get-port'

export default class Dev extends Core {
  async createServer() {
    const hmrPort = await getPort()

    const viteConfig = this.buildConfig({
      appType: 'custom',
      server: {
        middlewareMode: true,
        hmr: {
          port: hmrPort,
        },
      },
      clearScreen: false,
      root: this.buildDir,
      logLevel: process.env.NODE_ENV === 'test' ? 'silent' : undefined,
    })

    const viteDevServer = await vite.createServer(viteConfig)

    const app = createApp()

    app.use(
      this.config.baseUrl ?? '/',
      fromNodeMiddleware(serverStatic(path.join(this.buildDir, 'public'), { index: false })),
    )
    app.use(fromNodeMiddleware(viteDevServer.middlewares))

    await this._loadServerMiddleware(app, viteDevServer)
    await this._loadServerRoutes(app, viteDevServer)

    process.on('unhandledRejection', (reason) => {
      consola.error(reason)
    })

    app.use(
      eventHandler(async (event) => {
        const index = await fs.readFile(path.join(this.buildDir, 'index.html'), { encoding: 'utf-8' })
        const template = await viteDevServer.transformIndexHtml(event.path, index)

        try {
          // Loads entry.server.ts from the .sfx directory
          const { default: entry } = await viteDevServer.ssrLoadModule('/entry.server.ts')

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

          setResponseStatus(event, 500)

          if (process.env.NODE_ENV === 'test') {
            consola.error(e)
            return e.message ?? e
          } else {
            const youch = new Youch(e, event.node.req)
            const html = await youch.toHTML()
            return html
          }
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

  async _loadServerRoutes(app, viteDevServer) {
    const router = createRouter()
    router.handler.__serverRoutes = true

    app.use(
      eventHandler(async () => {
        const router = createRouter()
        router.handler.__serverRoutes = true

        const layer = app.stack.find((layer) => layer.handler.__serverRoutes)

        layer.handler = router.handler

        const { default: routes } = await viteDevServer.ssrLoadModule('/server/routes.ts', {
          fixStacktrace: true,
        })

        for (const [path, route] of Object.entries(routes)) {
          if (typeof route === 'function') {
            router.use(`/${path.replace(/\[\.\.\.\]/g, '**').replace(/\[(.+?)\]/g, (_, $1) => `:${$1}`)}`, route)
          }
        }
      }),
    )

    app.use(this.config.baseUrl ?? '/', router)
  }
}
