import path from 'node:path'
import fs from 'node:fs/promises'
import * as vite from 'vite'
import express from 'express'
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

    await this._loadServerStartup(viteDevServer)

    const server = express()

    server.disable('x-powered-by')

    server.use(viteDevServer.middlewares)
    server.use(express.static(path.join(this.buildDir, 'public')))

    await this._loadServerMiddleware(server, viteDevServer)
    await this._loadServerRoutes(server, viteDevServer)

    process.on('unhandledRejection', (reason) => {
      consola.error(reason)
    })

    server.get('*', async (req, res, next) => {
      try {
        const url = req.url ?? '/'

        const index = await fs.readFile(path.join(this.buildDir, 'index.html'), { encoding: 'utf-8' })
        const template = await viteDevServer.transformIndexHtml(url, index)

        // Loads entry.server.ts from the .sfx directory
        const { default: entry } = await viteDevServer.ssrLoadModule('/entry.server.ts')

        const response = await this.handleRequest({
          entry,
          req,
          res,
          template,
          manifest: {},
        })

        return response
      } catch (/** @type {any} */ e) {
        viteDevServer.ssrFixStacktrace(e)

        // TODO: Investigate why Vite doesn't fix the stack properly
        if (typeof e.stack === 'string') {
          e.stack = e.stack.replace(/\/@fs\//g, '/')
        }

        if (process.env.NODE_ENV === 'test') {
          next(e)
        } else {
          consola.error(e)

          const youch = new Youch(e, req)
          const html = await youch.toHTML()

          res.status(500).send(html)
        }
      }
    })

    this.onClose(async () => {
      await viteDevServer.close()
    })

    return server
  }

  async _loadServerStartup(viteDevServer) {
    await viteDevServer.ssrLoadModule('/server/startup.ts', {
      fixStacktrace: true,
    })
  }

  /**
   * @param {express.Express} server
   * @param {vite.ViteDevServer} viteDevServer
   */
  async _loadServerMiddleware(server, viteDevServer) {
    const router = express.Router()

    router.use(async (_, __, next) => {
      router.stack.splice(1)

      try {
        const { default: middlewares } = await viteDevServer.ssrLoadModule('/server/middleware.ts', {
          fixStacktrace: true,
        })

        for (const middleware of Object.values(middlewares)) {
          if (typeof middleware === 'function') router.use(middleware)
        }
      } catch (e) {
        consola.error('Could not load server middleware:', e)
      }

      next()
    })

    server.use(router)
  }

  /**
   * @param {express.Express} server
   * @param {vite.ViteDevServer} viteDevServer
   */
  async _loadServerRoutes(server, viteDevServer) {
    const router = express.Router()

    router.use(async (_, __, next) => {
      router.stack.splice(1)

      try {
        const { default: routes } = await viteDevServer.ssrLoadModule('/server/routes.ts', {
          fixStacktrace: true,
        })

        for (const [path, route] of Object.entries(routes)) {
          if (typeof route === 'function') router.use(`/${path}`, route)
        }
      } catch (e) {
        consola.error('Could not load server routes:', e)
      }

      next()
    })

    server.use(router)
  }
}
