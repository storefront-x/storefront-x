//@ts-check

import { GeneratingConcept } from '@magexo/core'

export default class ServerMiddleware extends GeneratingConcept {
  get directory() {
    return 'server/middleware'
  }
}
