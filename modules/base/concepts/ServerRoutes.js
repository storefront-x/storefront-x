//@ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class ServerRoutes extends GeneratingConcept {
  get directory() {
    return 'server/routes'
  }

  get template() {
    return `// @ts-nocheck
<%_ for (const [ident, {path}] of Object.entries(records)) { _%>
export ${this.exportAll ? '* as <%= ident %>' : '{ default as <%= ident %> }'} from '<%= path %>'
<%_ } _%>
`
  }
}
