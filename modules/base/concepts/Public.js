//@ts-check

import path from 'node:path'
import { CopyingConcept, Build } from '@storefront-x/core'

export default class Public extends CopyingConcept {
  get directory() {
    return 'public'
  }

  get recursive() {
    return true
  }

  dst() {
    if (this.core instanceof Build) {
      return path.join(this.core.distDir, 'client')
    } else {
      return path.join(this.core.buildDir, 'public')
    }
  }
}
