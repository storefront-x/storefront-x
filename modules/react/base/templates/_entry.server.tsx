import { renderToString } from 'react-dom/server'
import App from '~/.sfx/App'

export default async (ctx: any) => {
  const rendered = renderToString(<App />)

  ctx.out.html = (html: string) => html.replace('<div id="app"></div>', `<div id="app">${rendered}</div>`)
}
