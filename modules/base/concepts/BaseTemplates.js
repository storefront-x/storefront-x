//@ts-check

import { CopyingConcept } from '@storefront-x/core'

export default class BaseTemplates extends CopyingConcept {
  get directory() {
    return 'base/templates'
  }

  dst() {
    return this.core.buildDir
  }

  get removesDestinationDirectory() {
    return false
  }
}
