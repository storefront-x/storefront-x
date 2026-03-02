//@ts-check

import { GeneratingConcept } from '@magexo/core'

export default class ServerRoutes extends GeneratingConcept {
  get directory() {
    return 'server/routes'
  }

  get recursive() {
    return true
  }
}
