//@ts-check

import { GeneratingConcept } from '@magexo/core'

export default class VuePlugins extends GeneratingConcept {
  get directory() {
    return 'vue/plugins'
  }

  get exportAll() {
    return true
  }

  get supportsClientServer() {
    return true
  }
}
