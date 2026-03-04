// @ts-check

import { GeneratingConcept } from '@magexo/core'

export default class ShippingMethods extends GeneratingConcept {
  get directory() {
    return 'shippingMethods'
  }

  get exportAll() {
    return true
  }
}
