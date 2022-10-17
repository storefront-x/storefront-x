import type { App } from 'vue'
import globalStyles from '~/.sfx/global/styles'

export const after = async (app: App, ctx: any) => {
  ctx.out.globalStyles = (html: string) => {
    for (const style of Object.values(globalStyles)) {
      html = html.replace('</head>', `<style>${style}</style>\n</head>`)
    }

    return html
  }
}
