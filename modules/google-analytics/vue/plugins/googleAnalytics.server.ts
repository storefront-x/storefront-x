import type { App } from 'vue'
import GOOGLE_ANALYTICS_ID from '#ioc/config/googleAnalytics/GOOGLE_ANALYTICS_ID'

export const after = async (app: App, ctx?: any) => {
  ctx.out.googleAnalytics = (html: string) =>
    html.replace(
      '<head>',
      `<head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GOOGLE_ANALYTICS_ID}');
      </script>`,
    )
}
