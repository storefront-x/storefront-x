import path from 'node:path'
import { CopyingConcept } from '@storefront-x/core'

export default class CypressIntegration extends CopyingConcept {
  get directory() {
    return 'cypress/integration'
  }

  get recursive() {
    return true
  }

  dst() {
    return path.join(this.core.rootDir, this.directory)
  }
}
