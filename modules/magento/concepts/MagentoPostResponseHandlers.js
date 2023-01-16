//@ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class MagentoPostResponseHandlers extends GeneratingConcept {
  get directory() {
    return 'magento/postResponseHandlers'
  }

  get supportsClientServer() {
    return true
  }
}
