//@ts-check

import { GeneratingConcept } from '@magexo/core'

export default class MagentoBeforeRequest extends GeneratingConcept {
  get directory() {
    return 'magento/beforeRequest'
  }

  get supportsClientServer() {
    return true
  }
}
