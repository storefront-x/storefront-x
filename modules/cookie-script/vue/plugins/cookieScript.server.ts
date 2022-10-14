import type { App } from 'vue'
import COOKIE_SCRIPT_ID from '#ioc/config/COOKIE_SCRIPT_ID'

export const after = async (app: App, ctx?: any) => {
  ctx.out.cookieScript = (html: string) =>
    html.replace(
      '<head>',
      `<head><script type="text/javascript" charset="UTF-8" src="//cdn.cookie-script.com/s/${COOKIE_SCRIPT_ID}.js"></script>`,
    )
}
