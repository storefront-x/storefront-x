//@ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class ServerRoutes extends GeneratingConcept {
  get directory() {
    return 'server/routes'
  }

  get recursive() {
    return true
  }
}
