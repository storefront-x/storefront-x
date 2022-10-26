import path from 'node:path'
import fs from 'node:fs/promises'
import getPort from 'get-port'
import { Dev } from '@storefront-x/core'

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
      dir,
      modules: config.modules.map((pkg) => {
        if (typeof pkg === 'string') return pkg

        return `./${pkg[0]}`
      }),
      vite: {
        server: {
          watch: {
            // During tests we edit the files too fast and sometimes chokidar
            // misses change events, so enforce polling for consistency
            usePolling: true,
            interval: 100,
          },
          hmr: {
            port: hmrPort,
          },
        },
      },
    })

    await dev.bootstrap()

    const app = await dev.createServer()

    const server = await new Promise((resolve) => {
      const server = app.listen(serverPort, () => {
        resolve(server)
      })
    })

    const url = `http://localhost:${serverPort}`
    try {
      await callback({
        url,
        writeFile: async (_path, _content) => {
          await writeFile(path.join(dir, _path), _content)
          await new Promise((resolve) => setTimeout(resolve, 250)) // TODO: Remove timeout
        },
        rm: async (_path) => {
          await fs.rm(path.join(dir, _path), { recursive: true, force: true })
          await new Promise((resolve) => setTimeout(resolve, 250)) // TODO: Remove timeout
        },
      })
    } finally {
      await server.close()
      await dev.close()
    }
  })
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
