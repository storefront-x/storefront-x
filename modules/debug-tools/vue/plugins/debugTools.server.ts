import fs from 'node:fs/promises'
import path from 'node:path'
import type { App } from 'vue'

export const after = async (app: App, ctx: any) => {
  if (ctx.req.url.includes('/_debug')) return

  await fs.mkdir(path.join(process.cwd(), '.sfx', 'debug'), { recursive: true })

  const requests: any[] = []

  for (const { request, response, gql } of ctx.debugTools.requests) {
    requests.push({
      url: request.url,
      json: await response.json(),
    })
  }

  const data = {
    time: ctx.debugTools.time,
    url: ctx.req.url,
    requests,
  }

  await fs.writeFile(path.join(process.cwd(), '.sfx', 'debug', `${data.time}.json`), JSON.stringify(data, null, '  '))
}
