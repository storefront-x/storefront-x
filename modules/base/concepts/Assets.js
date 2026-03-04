//@ts-check

import { IocConcept } from '@magexo/core'

export default class Assets extends IocConcept {
  get directory() {
    return 'assets'
  }
}
