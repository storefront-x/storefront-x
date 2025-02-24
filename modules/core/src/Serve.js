import path from 'node:path'
import fs from 'node:fs/promises'
import url from 'node:url'
import consola from 'consola'
import Core from './Core.js'
import { createApp, eventHandler, fromNodeMiddleware, createRouter, setResponseStatus } from 'h3'
import compression from 'compression'
import serverStatic from 'serve-static'

export default class Serve extends Core {
  async createServer() {
    const config = await this._loadConfig()

    await this._loadServerStartup()

    const template = await fs.readFile(path.join(this.distDir, 'client', 'index.html'), { encoding: 'utf-8' })

    // this can throw syntax errors
    const { default: entry } = await import(
      url.pathToFileURL(path.join(this.distDir, 'server', 'entry.server.js')).href
    )

    const manifest = JSON.parse(
      await fs.readFile(path.join(this.distDir, 'client', '.vite', 'ssr-manifest.json'), { encoding: 'utf-8' }),
    )

    const app = createApp()

    if (this.argv.compression) {
      consola.withTag('serve').info('Enabling compression')

      app.use(fromNodeMiddleware(compression()))
    }

    app.use(
      path.join(config.baseUrl ?? '/', '/assets'),
      fromNodeMiddleware(
        serverStatic(path.join(this.distDir, 'client', 'assets'), {
          index: false,
          immutable: true, // We can use immutable because assets have their content hash in the name
          maxAge: '1y',
        }),
      ),
    )

    app.use(
      config.baseUrl ?? '/',
      fromNodeMiddleware(
        serverStatic(path.join(this.distDir, 'client'), {
          index: false,
        }),
      ),
    )

    await this._loadServerMiddleware(app)
    await this._loadServerRoutes(app, config)

    app.use(
      eventHandler(async (event) => {
        try {
          const response = await this.handleRequest({
            event,
            entry,
            template,
            manifest: this._normalizeManifest(manifest),
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

    process.on('unhandledRejection', (reason, promise) => {
      consola.error('Unhandled Rejection at:', promise, 'reason:', reason)
      consola.error('Exiting...')
      process.exit(2)
    })

    process.on('uncaughtException', (error) => {
      consola.error(new Date().toUTCString() + ' uncaughtException:', error.message)
      consola.error(error.stack)
      consola.error('Exiting...')
      process.exit(2)
    })

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

  async _loadServerRoutes(app, config) {
    const router = createRouter()

    const { href } = url.pathToFileURL(path.join(this.distDir, 'server', 'routes.js'))

    const { default: routes } = await import(href)

    for (const [path, route] of Object.entries(routes)) {
      if (typeof route === 'function') {
        router.use(`/${path.replace(/\[\.\.\.\]/g, '**').replace(/\[(.+?)\]/g, (_, $1) => `:${$1}`)}`, route)
      }
    }

    app.use(config.baseUrl ?? '/', router)
  }

  _normalizeManifest(manifest) {
    const normalized = {}

    for (const [key, value] of Object.entries(manifest)) {
      const normalizedKey = key.split('?')[0]

      if (!normalized[normalizedKey]) {
        normalized[normalizedKey] = []
      }

      normalized[normalizedKey].push(...value)
    }

    return normalized
  }

  async _loadConfig() {
    try {
      const config = await fs.readFile(path.resolve(this.distDir, 'sfx.json'), { encoding: 'utf-8' })
      return JSON.parse(config)
    } catch {
      console.error('Could not load sfx.json')
      return {}
    }
  }
}
