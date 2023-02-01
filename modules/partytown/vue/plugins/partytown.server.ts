import type { App } from 'vue'
import fs from 'fs/promises'
import { join } from 'node:path'
import { libDirPath } from '@builder.io/partytown/utils'
import PartytownConfig from '#ioc/config/partytown/config'
import IS_DEVELOPMENT from '#ioc/config/IS_DEVELOPMENT'

let partytownSnippet: string | undefined = undefined

export const after = async (app: App, ctx?: any) => {
  const { debug, forward } = PartytownConfig
  const libPath = IS_DEVELOPMENT ? libDirPath() + '/' : ''

  if (!partytownSnippet) {
    partytownSnippet = await fs.readFile(join(libDirPath(), './partytown.js'), 'utf-8')
  }

  const partytownConfig = `partytown = { debug: ${debug}, forward: ${JSON.stringify(forward)}, lib: "${libPath}" }`

  ctx.out.partytown = (html: string) =>
    html.replace(
      '<head>',
      `<head>\n
      <script type="text/javascript">${partytownConfig}</script>\n
      <script type="text/javascript">${partytownSnippet}</script>`,
    )
}
