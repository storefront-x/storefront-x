//@ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class VueRouterBeforeEach extends GeneratingConcept {
  get directory() {
    return 'vueRouter/beforeEach'
  }

  get recursive() {
    return true
  }

  get supportsClientServer() {
    return true
  }
}
