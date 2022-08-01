//@ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class FormattersMoney extends GeneratingConcept {
  get directory() {
    return 'formatters/money'
  }

  get exportAll() {
    return true
  }
}
