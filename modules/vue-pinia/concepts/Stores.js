//@ts-check

import { IocConcept } from '@storefront-x/core'

export default class Store extends IocConcept {
  get directory() {
    return 'stores'
  }
}
