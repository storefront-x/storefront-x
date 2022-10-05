import path from 'node:path'
import { CopyingConcept } from '@storefront-x/core'

export default class CypressPageObjects extends CopyingConcept {
  get directory() {
    return 'cypress/support/pageObjects'
  }

  get recursive() {
    return true
  }

  dst() {
    return path.join(this.core.rootDir, this.directory)
  }
}
