import fs from 'node:fs/promises'
import path from 'node:path'
import type { App } from 'vue'

export const after = async (app: App, ctx: any) => {
  if (ctx.req.url.includes('/_debug')) return

  await fs.mkdir(path.join(process.cwd(), '.sfx', 'debug'), { recursive: true })

  const requests: any[] = []

  for (const { request, response, gql } of ctx.debugTools.requests) {
    const json = await response.json()

    requests.push({
      url: request.url,
      name: gql._name,
      query: gql.toString(),
      variables: JSON.stringify(gql._bindings, null, '  '),
      hasErrors: json.errors?.length > 0,
      json: JSON.stringify(json, null, '  '),
      requestHeaders: JSON.stringify(Object.fromEntries(request.headers), null, '  '),
      responseHeaders: JSON.stringify(Object.fromEntries(response.headers), null, '  '),
    })
  }

  const data = {
    time: ctx.debugTools.time,
    url: ctx.req.url,
    requests,
  }

  await fs.writeFile(path.join(process.cwd(), '.sfx', 'debug', `${data.time}.json`), JSON.stringify(data))
}
