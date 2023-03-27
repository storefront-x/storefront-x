#!/usr/bin/env node

/* eslint-disable no-console */

import path from 'node:path'
import url from 'node:url'
import fs from 'fs-extra'
import prompts from 'prompts'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { green, red } from 'kolorist'

const argv = yargs(hideBin(process.argv))
const cwd = process.cwd()

const main = async () => {
  const responses = await getResponses()

  const __filename = url.fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  const src = path.join(__dirname, 'template', responses.integration)
  const dst = path.join(cwd, responses.directory)

  console.log(`\nScaffolding project in ${dst}...`)

  if (responses.overwrite) await fs.emptyDir(dst)

  await fs.copy(src, dst)

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm'

  console.log(`\n${green('✔')} Done. Now run:\n`)
  if (dst != cwd) {
    console.log(`  cd ${path.relative(cwd, dst)}`)
  }

  switch (pkgManager) {
    case 'yarn':
      console.log('  yarn install')
      console.log('  yarn dev')
      break
    default:
      console.log(`  ${pkgManager} install`)
      console.log(`  ${pkgManager} run dev`)
      break
  }
  console.log('')

  switch (responses.integration) {
    case 'px':
      console.log(
        'To learn more, visit the documentation: https://docs.storefrontx.io/integrations/magento.html#full-featured-magento',
      )
      break
    case 'magento':
      console.log(
        'To learn more, visit the documentation: https://docs.storefrontx.io/integrations/magento.html#vanilla-magento',
      )
      console.log('')
      break

    case 'blank':
      console.log('To learn more, visit the documentation: https://docs.storefrontx.io')
      console.log('')
      break
  }
}

async function getResponses() {
  prompts.override(argv.argv)

  const targetDir = argv.argv._[0]

  try {
    return await prompts(
      [
        {
          type: targetDir ? null : 'text',
          name: 'directory',
          message: 'Target directory',
          initial: 'storefront-x-app',
        },
        {
          type: (_, { directory }) => (fs.existsSync(directory) && !isEmpty(directory) ? 'confirm' : null),
          name: 'overwrite',
          message: (_, { directory }) =>
            (directory === '.' ? 'Current directory' : `Target directory "${directory}"`) +
            ` is not empty. Remove existing files and continue?`,
        },
        {
          type: (_, { overwrite } = {}) => {
            if (overwrite === false) {
              throw new Error(`${red('✖')} Operation cancelled`)
            }
            return null
          },
          name: 'overwriteChecker',
        },
        {
          type: 'select',
          name: 'integration',
          message: 'Pick a demo application',
          choices: [
            { title: 'Blank application', value: 'blank' },
            { title: 'Vanilla Magento integration', value: 'magento' },
            { title: 'Full-featured Magento', value: 'px' },
          ],
        },
      ],
      {
        onCancel: () => {
          throw new Error(`${red('✖')} Operation cancelled`)
        },
      },
    )
  } catch (e) {
    console.log(e.message)
    process.exit(0)
  }
}

function isEmpty(path) {
  return fs.readdirSync(path).length === 0
}

function pkgFromUserAgent(userAgent) {
  if (!userAgent) return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  }
}

main().catch(console.error)
