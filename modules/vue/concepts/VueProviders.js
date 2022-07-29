//@ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class VueProviders extends GeneratingConcept {
  get directory() {
    return 'vue/providers'
  }

  get supportsClientServer() {
    return true
  }
}
