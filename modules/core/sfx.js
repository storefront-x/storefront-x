#!/usr/bin/env node

import path from 'node:path'
import url from 'node:url'
import yargs from 'yargs'
import consola from 'consola'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .command({
    command: 'dev',
    description: 'Start the development server',
    builder: (yargs) => {
      yargs
        .option('host', {
          type: 'string',
          default: process.env.SERVER_HOST ?? 'localhost',
        })
        .option('port', {
          type: 'number',
          default: process.env.SERVER_PORT ?? '3000',
        })
    },
    handler: async (argv) => {
      const { default: config } = await import(url.pathToFileURL(path.resolve(process.cwd(), 'sfx.config.js')).href)
      const { default: Dev } = await import('./src/Dev.js')

      const dev = new Dev(config, argv)
      await dev.bootstrap()
      const server = await dev.createServer()

      server.listen(argv.port, argv.host, () =>
        consola.withTag('cli').log(`Server listening on http://${argv.host}:${argv.port}`),
      )
    },
  })
  .command({
    command: 'build',
    description: 'Build the production bundle',
    builder: (yargs) => {
      yargs
        .option('analyze', {
          type: 'boolean',
          description: 'Shows visualization of built JS bundles for analysis.',
        })
        .option('onlyBootstrap', {
          type: 'boolean',
          description: 'Run only SFX bootstrap instead of full build.',
        })
    },
    handler: async (argv) => {
      try {
        const { default: config } = await import(url.pathToFileURL(path.resolve(process.cwd(), 'sfx.config.js')).href)
        const { default: Build } = await import('./src/Build.js')

        const build = new Build(config, argv)
        await build.bootstrap()
        if (argv.onlyBootstrap) return
        await build.build()
      } catch (e) {
        consola.error(e)

        process.exit(1)
      }
    },
  })
  .command({
    command: 'serve',
    description: 'Start the production server',
    builder: (yargs) => {
      yargs
        .option('host', {
          type: 'string',
          default: process.env.SERVER_HOST ?? 'localhost',
        })
        .option('port', {
          type: 'number',
          default: process.env.SERVER_PORT ?? '3000',
        })
        .option('compression', {
          type: 'boolean',
          description: 'Enable compression of rendered HTML & static files',
        })
        .option('failOnServerError', {
          type: 'boolean',
          description:
            'When error occurs during SSR, SFX displays internal server error instead of falling back to client-only rendering.',
        })
    },
    handler: async (argv) => {
      consola.wrapAll()
      consola.setReporters(new consola.BasicReporter())

      const { default: Serve } = await import('./src/Serve.js')

      const serve = new Serve({}, argv)
      const server = await serve.createServer()

      server.listen(argv.port, argv.host, () =>
        consola.withTag('cli').log(`Server listening on http://${argv.host}:${argv.port}`),
      )
    },
  })
  .demandCommand(1)
  .help()
  .parse()
