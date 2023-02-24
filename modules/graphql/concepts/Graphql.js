//@ts-check

import { IocConcept } from '@storefront-x/core'

export default class Graphql extends IocConcept {
  get directory() {
    return 'graphql'
  }

  get recursive() {
    return false
  }
}
