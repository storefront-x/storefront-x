import path from 'node:path'
import { GeneratingConcept } from '@storefront-x/core'

export default class CypressIntegration extends GeneratingConcept {
  get directory() {
    return 'cypress/integration'
  }

  get extension() {
    return 'js'
  }

  get generateMultipleFiles() {
    return true
  }

  dst() {
    return path.join(this.core.rootDir, this.directory)
  }

  get template() {
    return `// generated by Storefront X
import '<%= record.path %>'
`
  }
}
