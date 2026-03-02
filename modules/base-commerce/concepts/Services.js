//@ts-check

import { IocConcept } from '@magexo/core'

export default class Services extends IocConcept {
  get directory() {
    return 'services'
  }
}
