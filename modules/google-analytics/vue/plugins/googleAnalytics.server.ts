import type { App } from 'vue'
import GOOGLE_ANALYTICS_ID from '#ioc/config/googleAnalytics/GOOGLE_ANALYTICS_ID'
import GOOGLE_ANALYTICS_SCRIPT_TYPE from '#ioc/config/googleAnalytics/GOOGLE_ANALYTICS_SCRIPT_TYPE'

export const after = async (app: App, ctx?: any) => {
  ctx.out.googleAnalytics = (html: string) =>
    html.replace(
      '<head>',
      `<head>
      <script async type="${GOOGLE_ANALYTICS_SCRIPT_TYPE}" src="https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}"></script>
      <script type="${GOOGLE_ANALYTICS_SCRIPT_TYPE}">
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GOOGLE_ANALYTICS_ID}');
      </script>`,
    )
}
