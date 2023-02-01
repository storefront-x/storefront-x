import path from 'node:path'
import fs from 'node:fs/promises'
import url from 'node:url'
import express from 'express'
import consola from 'consola'
import Core from './Core.js'

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

    const server = express()

    server.disable('x-powered-by')

    if (this.argv.compression) {
      consola.withTag('serve').info('Enabling compression')

      const { default: compression } = await import('compression')

      server.use(compression())
    }

    server.use(
      '/assets',
      express.static(path.join(this.distDir, 'client', 'assets'), {
        index: false,
        immutable: true, // We can use immutable because assets have their content hash in the name
        maxAge: '1y',
      }),
    )

    server.use(
      express.static(path.join(this.distDir, 'client'), {
        index: false,
      }),
    )

    await this._loadServerMiddleware(server)
    await this._loadServerRoutes(server)

    server.get('*', async (req, res) => {
      try {
        return await this.handleRequest({ entry, template, req, res, manifest })
      } catch (e) {
        //@ts-ignore
        consola.error(e)

        if (this.argv.failOnServerError) {
          res.status(500).send('Internal server error')
        } else {
          res.status(500).send(template)
        }
      }
    })

    return server
  }

  async _loadServerStartup() {
    const { href } = url.pathToFileURL(path.join(this.distDir, 'server', 'startup.js'))

    await import(href)
  }

  /**
   * @param {express.Express} server
   */
  async _loadServerMiddleware(server) {
    const { href } = url.pathToFileURL(path.join(this.distDir, 'server', 'middleware.js'))

    const { default: middlewares } = await import(href)

    for (const middleware of Object.values(middlewares)) {
      server.use(middleware)
    }
  }

  /**
   * @param {express.Express} server
   */
  async _loadServerRoutes(server) {
    const { href } = url.pathToFileURL(path.join(this.distDir, 'server', 'routes.js'))

    const { default: routes } = await import(href)

    for (const [path, route] of Object.entries(routes)) {
      server.use(`/${path}`, route)
    }
  }
}
