import path from 'node:path'
import { CopyingConcept } from '@storefront-x/core'

export default class Cypress extends CopyingConcept {
  get directory() {
    return 'cypress'
  }

  get recursive() {
    return true
  }

  dst() {
    return path.join(this.core.rootDir, this.directory)
  }
}
