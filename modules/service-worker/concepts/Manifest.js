import { GeneratingConcept } from '@storefront-x/core'
import path from 'node:path'

export default class Manifest extends GeneratingConcept {
  get directory() {
    return 'manifest'
  }

  dst() {
    return path.join(this.core.buildDir, 'ioc', path.dirname(this.directory), path.basename(this.directory))
  }
}
