//@ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class ErrorHandlers extends GeneratingConcept {
  get directory() {
    return 'magento/errorHandlers'
  }

  get recursive() {
    return true
  }
}
