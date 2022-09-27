import path from 'node:path'
import { CopyingConcept } from '@storefront-x/core'

export default class CypressFixtures extends CopyingConcept {
  get directory() {
    return 'cypress/fixtures'
  }

  get recursive() {
    return true
  }

  dst() {
    return path.join(this.core.rootDir, this.directory)
  }
}
