import path from 'node:path'
import { CopyingConcept } from '@storefront-x/core'

export default class CypressRepoitories extends CopyingConcept {
  get directory() {
    return 'cypress/support/repositories'
  }

  get recursive() {
    return true
  }

  dst() {
    return path.join(this.core.rootDir, this.directory)
  }
}
