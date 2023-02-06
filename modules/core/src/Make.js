import consola from 'consola'
import prompts from 'prompts'
import { green, red } from 'kolorist'
import fs from 'fs-extra'
import path from 'node:path'

export default class Make {
  constructor(argv = {}) {
    this.argv = argv
  }

  async createModule() {
    const responses = await this.getResponses()
    const dst = path.join(process.cwd(), responses.directory, responses.moduleName).replace(/\\/g, '/')

    await fs.mkdir(dst)

    const packageName = responses.vendorName ? `@${responses.vendorName}/${responses.moduleName}` : responses.moduleName

    let packageFile = {
      name: packageName,
      version: '0.0.0',
      license: 'MIT',
      type: 'module',
    }

    if (responses.moduleDescription) {
      packageFile = {
        ...packageFile,
        description: responses.moduleDescription,
      }
    }

    if (responses.access === 'private') {
      packageFile = {
        ...packageFile,
        private: true,
      }
    } else {
      packageFile = {
        ...packageFile,
        publishConfig: {
          access: responses.access,
        },
      }
    }

    await fs.writeFile(path.join(dst, 'package.json'), JSON.stringify(packageFile))

    consola.log(`\n${green('✔')} Done\n`)

    const pkgInfo = this.pkgFromUserAgent(process.env.npm_config_user_agent)
    const pkgManager = pkgInfo ? pkgInfo.name : 'npm'

    consola.log(`Add your module ${packageName} to your storefront-x config file and then run: \n`)

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

  async getResponses() {
    try {
      return await prompts(
        [
          {
            type: 'text',
            name: 'directory',
            message: 'Module directory',
            initial: './modules',
          },
          {
            type: 'text',
            name: 'vendorName',
            message: 'Vendor name (e.g. storefront-x)',
          },
          {
            type: 'text',
            name: 'moduleName',
            message: 'Module name',
            validate: (value) => (value === '' ? `Required` : true),
          },
          {
            type: (_, { directory, moduleName } = {}) => {
              if (fs.existsSync(path.join(directory, moduleName)) && !this.isEmpty(path.join(directory, moduleName))) {
                throw new Error(`${red('✖')} Operation cancelled. Module ${moduleName} already exists.`)
              }
              return null
            },
            name: 'overwriteChecker',
          },
          {
            type: 'text',
            name: 'moduleDescription',
            message: 'Module description',
          },
          {
            type: 'select',
            name: 'access',
            message: 'Choose if module is private or public',
            choices: [
              { title: 'Private', value: 'private' },
              { title: 'Public', value: 'public' },
            ],
            initial: 0,
          },
        ],
        {
          onCancel: () => {
            throw new Error(`${red('✖')} Operation cancelled`)
          },
        },
      )
    } catch (e) {
      process.exit(0)
    }
  }

  isEmpty(path) {
    return fs.readdirSync(path).length === 0
  }

  pkgFromUserAgent(userAgent) {
    if (!userAgent) return undefined
    const pkgSpec = userAgent.split(' ')[0]
    const pkgSpecArr = pkgSpec.split('/')
    return {
      name: pkgSpecArr[0],
      version: pkgSpecArr[1],
    }
  }
}
