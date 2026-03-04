//@ts-check

import { IocConcept } from '@magexo/core'

export default class Repositories extends IocConcept {
  get directory() {
    return 'repositories'
  }
}
