//@ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class ServerPreload extends GeneratingConcept {
  get directory() {
    return 'server/preload'
  }

  get template() {
    return `// generated by Storefront X
<%_ for (const item in records) { _%>
import '<%= records[item].path %>'
<%_ } _%>

// Supress warnings about empty chunks
export default {}
`
  }
}
