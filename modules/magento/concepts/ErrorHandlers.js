//@ts-check

import { GeneratingConcept } from '@magexo/core'

export default class ErrorHandlers extends GeneratingConcept {
  get directory() {
    return 'magento/errorHandlers'
  }

  get recursive() {
    return true
  }
}
