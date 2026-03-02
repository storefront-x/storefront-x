//@ts-check

import { IocConcept } from '@magexo/core'

export default class Store extends IocConcept {
  get directory() {
    return 'stores'
  }
}
