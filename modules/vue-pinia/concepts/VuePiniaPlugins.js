//@ts-check

import { GeneratingConcept } from '@magexo/core'

export default class VuePiniaPlugin extends GeneratingConcept {
  get directory() {
    return 'vuePinia/plugins'
  }
}
