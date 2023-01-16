//@ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class MagentoRequestHeaders extends GeneratingConcept {
  get directory() {
    return 'magento/requestHeaders'
  }
}
