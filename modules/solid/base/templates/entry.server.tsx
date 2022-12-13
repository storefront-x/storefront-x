import { renderToStringAsync, generateHydrationScript } from 'solid-js/web'
import App from '~/.sfx/App'

const hydrationScript = generateHydrationScript()

export default async (ctx: any) => {
  const rendered = await renderToStringAsync(() => <App />, {
    timeoutMs: 1000,
  })

  ctx.out.html = (html: string) =>
    html.replace('<div id="app"></div>', `<div id="app">${rendered}</div>${hydrationScript}`)
}
