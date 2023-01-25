import type { App } from 'vue'
import fs from 'fs/promises'
import { join } from 'node:path'
import { libDirPath } from '@builder.io/partytown/utils'
import usePartytownConfig from '#ioc/config/PARTYTOWN_CONFIG'

let partytownSnippet: string | undefined = undefined

export const after = async (app: App, ctx?: any) => {
  const { debug, forward } = usePartytownConfig()

  if (!partytownSnippet) {
    const data = await fs.readFile(join(libDirPath(), './partytown.js'), 'utf-8')
    partytownSnippet = data
  }

  const partytownConfig = `partytown = { debug: ${debug}, forward: ${JSON.stringify(forward)}, lib: "${
    libDirPath() + '/'
  }" }`

  ctx.out.partytown = (html: string) =>
    html.replace(
      '<head>',
      `<head>\n
      <script type="text/javascript">${partytownConfig}</script>\n
      <script type="text/javascript">${partytownSnippet}</script>`,
    )
}
