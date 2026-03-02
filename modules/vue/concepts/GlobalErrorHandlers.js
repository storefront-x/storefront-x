//@ts-check

import { GeneratingConcept } from '@magexo/core'

export default class GlobalErrorHandlers extends GeneratingConcept {
  get directory() {
    return 'vue/errorHandlers'
  }

  get supportsClientServer() {
    return true
  }

  get recursive() {
    return true
  }
}
