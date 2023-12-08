import type { App } from 'vue'
import globalStyles from '~/.sfx/global/styles'

export const after = async (app: App, ctx: any) => {
  ctx.out.globalStyles = (html: string) => {
    for (const style of Object.values(globalStyles)) {
      html = html.replace('<link rel="stylesheet"', `<style>${style}</style>\n<link rel="stylesheet"`)
    }

    return html
  }
}
