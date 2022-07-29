import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'
// @ts-ignore
import * as plugins from './vue/plugins.server'

export default async (ctx: any) => {
  const app = createSSRApp(App)
  ctx.$app = app

  for (const plugin of Object.values(plugins) as any) {
    if (plugin.default) {
      await plugin.default(app, ctx)
    }
  }

  const rendered = await renderToString(app, ctx)

  // TODO: Ugh...
  ctx.out.html = (html: string) => html.replace('<div id="app"></div>', `<div id="app">${rendered}</div>`)

  for (const plugin of Object.values(plugins) as any) {
    if (plugin.after) {
      await plugin.after(app, ctx)
    }
  }
}
