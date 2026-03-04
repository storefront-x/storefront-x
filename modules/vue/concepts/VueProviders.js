//@ts-check

import { GeneratingConcept } from '@magexo/core'

export default class VueProviders extends GeneratingConcept {
  get directory() {
    return 'vue/providers'
  }

  get supportsClientServer() {
    return true
  }
}
