import path from 'node:path'
import { CopyingConcept } from '@storefront-x/core'

export default class Cypress extends CopyingConcept {
  get directory() {
    return 'cypress'
  }

  dst() {
    return path.join(this.core.rootDir, this.directory)
  }
}
