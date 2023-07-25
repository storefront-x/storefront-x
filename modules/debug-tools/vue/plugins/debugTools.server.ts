import type { App } from 'vue'

// @ts-ignore
global.debugToolsData = []

export const after = async (app: App, ctx: any) => {
  if (ctx.event.node.req.url.includes('/_debug')) return

  if (!ctx.debugTools) {
    ctx.debugTools = {
      time: Date.now(),
      requests: [],
    }
  }

  const requests: any[] = []

  for (const { url, name, request, response, fields } of ctx.debugTools.requests) {
    requests.push({
      url,
      name,
      requestHeaders: JSON.stringify(Object.fromEntries(request.headers), null, '  '),
      responseHeaders: JSON.stringify(Object.fromEntries(response.headers), null, '  '),
      response: await (response.headers.get('content-type')?.includes('application/json')
        ? response.json()
        : response.text()),
      fields,
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
