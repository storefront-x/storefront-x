// @ts-check

import { GeneratingConcept } from '@magexo/core'

export default class PaymentMethods extends GeneratingConcept {
  get directory() {
    return 'paymentMethods'
  }

  get exportAll() {
    return true
  }
}
