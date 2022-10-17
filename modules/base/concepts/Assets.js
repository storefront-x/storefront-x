//@ts-check

import { IocConcept } from '@storefront-x/core'

export default class Assets extends IocConcept {
  get directory() {
    return 'assets'
  }
}
