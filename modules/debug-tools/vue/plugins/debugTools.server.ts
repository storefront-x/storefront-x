import type { App } from 'vue'

// @ts-ignore
global.debugToolsData = []

export const after = async (app: App, ctx: any) => {
  if (ctx.event.node.req.url.includes('/_debug')) return

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
    url: ctx.event.node.req.url,
    requests,
  }
  // @ts-ignore
  global.debugToolsData.push(data)
}
