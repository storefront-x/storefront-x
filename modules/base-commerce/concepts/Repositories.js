//@ts-check

import { IocConcept } from '@storefront-x/core'

export default class Repositories extends IocConcept {
  get directory() {
    return 'repositories'
  }
}
