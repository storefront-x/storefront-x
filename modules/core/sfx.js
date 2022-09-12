#!/usr/bin/env node

import path from 'node:path'
import url from 'node:url'
import yargs from 'yargs'
import consola from 'consola'
import { hideBin } from 'yargs/helpers'
import Dev from './src/Dev.js'
import Build from './src/Build.js'
import Serve from './src/Serve.js'

const logger = consola.withTag('cli')

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
        .option('config', {
          type: 'string',
          default: 'storefront-x.config.js',
          description: 'Path to the Storefront X configuration file',
        })
    },
    handler: async (argv) => {
      try {
        logger.log('Loading', argv.config)

        const { href } = url.pathToFileURL(path.resolve(process.cwd(), argv.config))

        const { default: config } = await import(href)

        const dev = new Dev(config, argv)
        await dev.bootstrap()
        const server = await dev.createServer()

        server.listen(argv.port, argv.host, () => {
          logger.log(`Server listening on http://${argv.host}:${argv.port}`)
        })
      } catch (e) {
        consola.error(e)

        process.exit(1)
      }
    },
  })
  .command({
    command: 'build',
    description: 'Build the production bundle',
    builder: (yargs) => {
      yargs
        .option('config', {
          type: 'string',
          default: 'storefront-x.config.js',
          description: 'Path to the Storefront X configuration file',
        })
        .option('analyze', {
          type: 'boolean',
          description: 'Shows visualization of built JS bundles for analysis.',
        })
        .option('onlyBootstrap', {
          type: 'boolean',
          description: 'Run only SFX bootstrap instead of full build.',
        })
        .option('minify', {
          type: 'string',
          default: 'esbuild',
          description: 'Algorithm used for minification.',
        })
    },
    handler: async (argv) => {
      try {
        logger.log('Loading', argv.config)

        const { href } = url.pathToFileURL(path.resolve(process.cwd(), argv.config))

        const { default: config } = await import(href)

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
      try {
        const start = Date.now()

        consola.wrapAll()
        consola.setReporters(new consola.BasicReporter())

        const serve = new Serve({}, argv)
        const server = await serve.createServer()

        server.listen(argv.port, argv.host, () => {
          logger.log(`Server listening on http://${argv.host}:${argv.port}`)
          logger.log(`Server started in ${Date.now() - start}ms`)
        })
      } catch (e) {
        consola.error(e)

        process.exit(1)
      }
    },
  })
  .demandCommand(1)
  .help()
  .parse()
