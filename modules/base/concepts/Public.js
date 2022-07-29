//@ts-check

import { CopyingConcept } from '@storefront-x/core'
/**
 * Serves public files
 *
 * a.txt will be served from theme module (overridden)
 * b.txt will be served from base mdoule (not overridden)
 *
 * /base
 *   /public
 *     /a.txt
 *     /b.txt
 * /theme
 *   /public
 *     /a.txt
 */

export default class Public extends CopyingConcept {
  get directory() {
    return 'public'
  }

  get recursive() {
    return true
  }
}
