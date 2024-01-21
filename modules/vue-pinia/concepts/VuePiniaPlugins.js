//@ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class VuePiniaPlugin extends GeneratingConcept {
  get directory() {
    return 'vuePinia/plugins'
  }
}
