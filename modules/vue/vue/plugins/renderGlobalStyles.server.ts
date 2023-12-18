import type { App } from 'vue'
import globalStyles from '~/.sfx/global/styles'

const anchor = '<meta http-equiv="X-UA-Compatible" content="ie=edge" />'

export const after = async (app: App, ctx: any) => {
  ctx.out.globalStyles = (html: string) => {
    for (const style of Object.values(globalStyles)) {
      html = html.replace(anchor, `${anchor}\n<style>${style}</style>`)
    }

    return html
  }
}
