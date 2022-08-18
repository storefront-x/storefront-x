//@ts-check

import { IocConcept } from '@storefront-x/core'

export default class Errors extends IocConcept {
  get directory() {
    return 'errors'
  }
}
