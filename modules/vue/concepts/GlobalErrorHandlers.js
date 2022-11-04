//@ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class GlobalErrorHandlers extends GeneratingConcept {
  get directory() {
    return 'vue/errors'
  }

  get recursive() {
    return true
  }
}
