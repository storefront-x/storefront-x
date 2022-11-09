//@ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class GlobalErrorHandlers extends GeneratingConcept {
  get directory() {
    return 'vue/errorHandlers'
  }

  get recursive() {
    return true
  }
}
