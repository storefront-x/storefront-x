//@ts-check

import { IocConcept } from '@storefront-x/core'

export default class Services extends IocConcept {
  get directory() {
    return 'services'
  }
}
