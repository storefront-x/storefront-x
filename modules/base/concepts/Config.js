//@ts-check

import { IocConcept } from '@magexo/core'

export default class Config extends IocConcept {
  get directory() {
    return 'config'
  }
}
