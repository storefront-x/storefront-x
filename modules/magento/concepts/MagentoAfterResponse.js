//@ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class MagentoAfterResponse extends GeneratingConcept {
  get directory() {
    return 'magento/afterResponse'
  }

  get supportsClientServer() {
    return true
  }
}
