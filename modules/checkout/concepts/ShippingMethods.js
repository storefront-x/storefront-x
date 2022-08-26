// @ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class ShippingMethods extends GeneratingConcept {
  get directory() {
    return 'shippingMethods'
  }

  get exportAll() {
    return true
  }
}
