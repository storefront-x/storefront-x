import consola from 'consola'
import prompts from 'prompts'
import { green, red } from 'kolorist'
import fs from 'node:fs'
import path from 'node:path'

export default async () => {
  const responses = await getResponses()
  const dst = path.join(process.cwd(), responses.directory, responses.moduleName).replace(/\\/g, '/')

  fs.mkdirSync(dst)

  let packageFile = {
    name: `${responses.moduleName}`,
    version: '0.0.0',
    license: responses.license,
    type: 'module',
  }

  if (responses.moduleDescription) {
    packageFile = {
      ...packageFile,
      description: responses.moduleDescription,
    }
  }

  if (responses.isPublishable) {
    packageFile = {
      ...packageFile,
      publishConfig: {
        access: 'public',
      },
    }
  } else {
    packageFile = {
      ...packageFile,
      private: true,
    }
  }

  fs.writeFileSync(path.join(dst, 'package.json'), JSON.stringify(packageFile, null, '  '))

  consola.log(`\n${green('✔')} Done\n`)

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm'

  consola.log(`Add your module ${responses.moduleName} to your storefront-x config file and then run: \n`)

  switch (pkgManager) {
    case 'yarn':
      consola.log('  yarn install')
      consola.log('  yarn dev')
      break
    default:
      consola.log(`  ${pkgManager} install`)
      consola.log(`  ${pkgManager} run dev`)
      break
  }
}

const getResponses = async () => {
  try {
    return await prompts(
      [
        {
          type: 'text',
          name: 'directory',
          message: 'Module directory',
          initial: 'modules',
        },
        {
          type: (_, { directory } = {}) => {
            if (!fs.existsSync(path.join(directory))) {
              fs.mkdirSync(directory)
            }
            return null
          },
          name: 'directoryChecker',
        },
        {
          type: 'text',
          name: 'moduleName',
          message: 'Module name',
          validate: (value) => (value === '' ? `Required` : true),
        },
        {
          type: (_, { directory, moduleName } = {}) => {
            if (fs.existsSync(path.join(directory, moduleName)) && !isEmpty(path.join(directory, moduleName))) {
              throw new Error(`${red('✖')} Operation cancelled. Module ${moduleName} already exists.`)
            }

            if (fs.existsSync(path.join(directory, moduleName)) && isEmpty(path.join(directory, moduleName))) {
              fs.rmdirSync(path.join(directory, moduleName))
            }
            return null
          },
          name: 'overwriteChecker',
        },
        {
          type: 'text',
          name: 'moduleLicense',
          message: 'License',
          initial: 'UNLICENSED',
        },
        {
          type: 'text',
          name: 'moduleDescription',
          message: 'Module description',
        },
        {
          type: 'toggle',
          name: 'isPublishable',
          message: 'Should this module be publishable to NPM?',
          initial: false,
          active: 'yes',
          inactive: 'no',
        },
      ],
      {
        onCancel: () => {
          throw new Error(`${red('✖')} Operation cancelled`)
        },
      },
    )
  } catch (e) {
    consola.error(e.message)
    process.exit(1)
  }
}

const isEmpty = (path) => {
  return fs.readdirSync(path).length === 0
}

const pkgFromUserAgent = (userAgent) => {
  if (!userAgent) return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  }
}
