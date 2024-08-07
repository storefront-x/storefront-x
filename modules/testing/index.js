import path from 'node:path'
import http from 'node:http'
import fs from 'node:fs/promises'
import getPort from 'get-port'
import { toNodeListener } from 'h3'
import { Build, Dev, Serve } from '@storefront-x/core'

export const makeProject = async (config, callback) => {
  await makeTempDir(async (dir) => {
    if (config.files) await writeDirectory(dir, config.files)

    for (const pkg of config.modules) {
      if (typeof pkg === 'string') continue

      await writePackage(dir, pkg[0], pkg[1])
    }

    const hmrPort = await getPort()
    const serverPort = await getPort()

    const dev = new Dev({
      ...config,
      dir,
      modules: config.modules.map((pkg) => {
        if (typeof pkg === 'string') return pkg

        return `./${pkg[0]}`
      }),
      vite: {
        server: {
          hmr: {
            port: hmrPort,
          },
        },
      },
    })

    await dev.bootstrap()

    const app = await dev.createServer()

    const server = await new Promise((resolve) => {
      const server = http.createServer(toNodeListener(app)).listen(serverPort, () => {
        resolve(server)
      })
    })

    const url = `http://localhost:${serverPort}`

    try {
      await callback({
        url,
        writeFile: async (_path, _content) => {
          try {
            await writeFile(path.join(dir, _path), _content)
            await new Promise((resolve) => setTimeout(resolve, 250)) // TODO: Remove timeout
          } catch (e) {
            console.error(e)
          }
        },
        rm: async (_path) => {
          try {
            await fs.rm(path.join(dir, _path), { recursive: true, force: true })
            await new Promise((resolve) => setTimeout(resolve, 250)) // TODO: Remove timeout
          } catch (e) {
            console.error(e)
          }
        },
      })
    } finally {
      await dev.close()
      await server.close()
    }
  })
}

export const buildProject = async (config, callback = () => undefined) => {
  await makeTempDir(async (dir) => {
    for (const pkg of config.modules) {
      if (typeof pkg === 'string') continue

      await writePackage(dir, pkg[0], pkg[1])
    }

    const build = new Build({
      ...config,
      dir,
      modules: config.modules.map((pkg) => {
        if (typeof pkg === 'string') return pkg

        return `./${pkg[0]}`
      }),
      vite: {
        logLevel: 'silent',
      },
    })

    await build.bootstrap()
    await build.build()
    const serverPort = await getPort()
    const host = 'localhost'

    const serve = new Serve({ dir }, { host, port: serverPort })

    const app = await serve.createServer()

    const server = await new Promise((resolve) => {
      const server = http.createServer(toNodeListener(app)).listen(serverPort, () => {
        resolve(server)
      })
    })

    const url = `http://${host}:${serverPort}`

    try {
      await callback({
        url,
      })
    } finally {
      await server.close()
    }
  })
}

export const wrapConsole = async (callback) => {
  const errors = []
  const warnings = []

  const oldError = console.error
  const oldWarn = console.warn

  console.error = (e) => {
    errors.push(e.toString())
  }

  console.warn = (e) => {
    warnings.push(e.toString())
  }

  await callback()

  console.error = oldError
  console.warn = oldWarn

  return { errors: errors.join('\n'), warnings: warnings.join('\n') }
}
const makeTempDir = async (fn) => {
  const dir = await fs.mkdtemp('.test/temp-')

  await fn(path.join(process.cwd(), dir))
}

const writeFile = async (file, content) => {
  const dir = path.dirname(file)
  if (dir !== '.') await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(file, content, { encoding: 'utf-8' })
}

const writeDirectory = async (dir, structure) => {
  for (const [key, value] of Object.entries(structure)) {
    if (typeof value === 'string') {
      await writeFile(path.join(dir, key), value)
    } else {
      await writeDirectory(path.join(dir, key), value)
    }
  }
}

const writePackage = async (dir, name, structure = {}) => {
  await writeFile(path.join(dir, name, 'package.json'), `{ "name": "${name}", "type": "module" }`)

  await writeDirectory(path.join(dir, name), structure)
}
