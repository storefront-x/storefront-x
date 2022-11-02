//@ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class GlobalBeforeEach extends GeneratingConcept {
  get directory() {
    return 'global-before-each'
  }

  get recursive() {
    return true
  }
}
