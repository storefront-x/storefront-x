//@ts-check

import { IocConcept } from '@storefront-x/core'

export default class Providers extends IocConcept {
  get directory() {
    return 'providers'
  }
}
