import path from 'node:path'
import { CopyingConcept } from '@storefront-x/core'

export default class CypressComponent extends CopyingConcept {
  get directory() {
    return 'cypress/support'
  }

  dst() {
    return path.join(this.core.rootDir, this.directory)
  }

  get removesDestinationDirectory() {
    return false
  }
}
