import type { App } from 'vue'
import fs from 'fs'
import { join } from 'node:path'
import { libDirPath } from '@builder.io/partytown/utils'

export const after = async (app: App, ctx?: any) => {
  const partyTownSnippet = fs.readFileSync(join(libDirPath(), 'partytown.js'), 'utf-8')
  const partyTownConfig = `partytown = { debug: false, forward: [], lib: "'${libDirPath()}'" }`

  ctx.out.partyTown = (html: string) =>
    html.replace(
      '<head>',
      `<head>\n
      <script>${partyTownSnippet}</script>\n
      <script>${partyTownConfig}</script>`,
    )
}
