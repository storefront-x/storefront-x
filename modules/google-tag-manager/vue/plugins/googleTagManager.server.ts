import type { App } from 'vue'
import GOOGLE_TAG_MANAGER_ID from '#ioc/config/GOOGLE_TAG_MANAGER_ID'

export const after = async (app: App, ctx?: any) => {
  ctx.out.googleTagManager = (html: string) =>
    html.replace(
      '<head>',
      `<head><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GOOGLE_TAG_MANAGER_ID}');</script>`,
    )
}
