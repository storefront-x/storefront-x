//@ts-check

import { IocConcept } from '@magexo/core'

export default class Providers extends IocConcept {
  get directory() {
    return 'providers'
  }
}
