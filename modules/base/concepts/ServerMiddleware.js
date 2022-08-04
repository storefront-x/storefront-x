//@ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class ServerMiddleware extends GeneratingConcept {
  get directory() {
    return 'server/middleware'
  }
}
