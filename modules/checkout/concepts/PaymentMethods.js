// @ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class PaymentMethods extends GeneratingConcept {
  get directory() {
    return 'paymentMethods'
  }

  get exportAll() {
    return true
  }
}
