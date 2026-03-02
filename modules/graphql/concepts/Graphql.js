//@ts-check

import { IocConcept } from '@magexo/core'

export default class Graphql extends IocConcept {
  get directory() {
    return 'graphql'
  }

  get recursive() {
    return false
  }
}
