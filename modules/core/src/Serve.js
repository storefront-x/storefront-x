import path from 'node:path'
import fs from 'node:fs/promises'
import url from 'node:url'
import consola from 'consola'
import Core from './Core.js'
import { createApp, eventHandler, fromNodeMiddleware, createRouter, setResponseStatus } from 'h3'
import serverStatic from 'serve-static'

export default class Serve extends Core {
  async createServer() {
    await this._loadServerStartup()

    const template = await fs.readFile(path.join(this.distDir, 'client', 'index.html'), { encoding: 'utf-8' })

    const { default: entry } = await import(
      url.pathToFileURL(path.join(this.distDir, 'server', 'entry.server.js')).href
    )

    const manifest = JSON.parse(
      await fs.readFile(path.join(this.distDir, 'client', 'ssr-manifest.json'), { encoding: 'utf-8' }),
    )
    const app = createApp()
    // server.disable('x-powered-by')

    if (this.argv.compression) {
      consola.withTag('serve').info('Enabling compression')

      // const { default: compression } = await import('compression')

      // server.use(compression())
    }
    app.use(
      '/assets',
      fromNodeMiddleware(
        serverStatic(path.join(this.distDir, 'client', 'assets'), {
          index: false,
          immutable: true, // We can use immutable because assets have their content hash in the name
          maxAge: '1y',
        }),
      ),
    )
    app.use(
      fromNodeMiddleware(
        serverStatic(path.join(this.distDir, 'client'), {
          index: false,
        }),
      ),
    )

    await this._loadServerMiddleware(app)
    await this._loadServerRoutes(app)
    app.use(
      eventHandler(async (event) => {
        try {
          const response = await this.handleRequest({
            event,
            entry,
            template,
            manifest,
          })

          return response
        } catch (e) {
          //@ts-ignore
          consola.error(e)
          setResponseStatus(event, 500)
          if (this.argv.failOnServerError) {
            return 'Internal server error'
          } else {
            return template
          }
        }
      }),
    )

    return app
  }

  async _loadServerStartup() {
    const { href } = url.pathToFileURL(path.join(this.distDir, 'server', 'startup.js'))

    await import(href)
  }

  async _loadServerMiddleware(app) {
    app.use(
      eventHandler(async (event) => {
        const { href } = url.pathToFileURL(path.join(this.distDir, 'server', 'middleware.js'))

        const { default: middlewares } = await import(href)

        for (const middleware of Object.values(middlewares)) {
          const response = await middleware(event)
          if (response) return response
        }
      }),
    )
  }

  async _loadServerRoutes(app) {
    const router = createRouter()

    try {
      const { href } = url.pathToFileURL(path.join(this.distDir, 'server', 'routes.js'))

      const { default: routes } = await import(href)

      for (const [path, route] of Object.entries(routes)) {
        if (typeof route === 'function') {
          router.get(`/${path.replace(/\[(.+?)\]/g, (_, $1) => `:${$1}`)}`, route)
        }
      }

      app.use(router)
    } catch (e) {
      consola.error('Could not load server routes:', e)
    }
  }
}
