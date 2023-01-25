import type { App } from 'vue'
import GOOGLE_ANALYTICS_ID from '#ioc/config/googleAnalytics/GOOGLE_ANALYTICS_ID'

const usePartytownConfig = import.meta.glob('#ioc/config/PARTYTOWN_CONFIG', { eager: true })

export const after = async (app: App, ctx?: any) => {
  const partytown: any = Object.values(usePartytownConfig)
    .map(({ default: use }) => use())
    .pop()
  const type = partytown?.forward?.includes('gtag') ? 'text/partytown' : 'text/javascript'

  ctx.out.googleAnalytics = (html: string) =>
    html.replace(
      '<head>',
      `<head>
      <script async type="${type}" src="https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}"></script>
      <script type="${type}">
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GOOGLE_ANALYTICS_ID}');
      </script>`,
    )
}
