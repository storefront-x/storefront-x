import type { App } from 'vue'
import NPROGRESS_BAR_COLOR from '#ioc/config/NPROGRESS_BAR_COLOR'
import NPROGRESS_BAR_HEIGHT from '#ioc/config/NPROGRESS_BAR_HEIGHT'

const style = `<style>
  #nprogress .bar {
    background: ${NPROGRESS_BAR_COLOR};
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: ${NPROGRESS_BAR_HEIGHT}px;
  }
  </style>`

const inlineStyle = style.replace(/\s\s+/gs, ' ')

export const after = async (app: App, ctx?: any) => {
  ctx.out.nprogress = (html: string) => html.replace('<style', `${inlineStyle}\n<style`)
}
