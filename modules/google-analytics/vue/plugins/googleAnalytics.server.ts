import type { App } from 'vue'
import ID from '#ioc/config/googleAnalytics/ID'

export const after = async (app: App, ctx?: any) => {
  ctx.out.googleAnalytics = (html: string) =>
    html.replace(
      '<head>',
      `<head>\n<script async src="https://www.googletagmanager.com/gtag/js?id=${ID}"></script>\n
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${ID}');
      </script>`,
    )
}
