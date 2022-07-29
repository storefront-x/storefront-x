//@ts-check

import { IocConcept } from '@storefront-x/core'

export default class Config extends IocConcept {
  get directory() {
    return 'config'
  }
}
