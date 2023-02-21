import type { App } from 'vue'
import IS_DEVELOPMENT from '#ioc/config/IS_DEVELOPMENT'

export const after = async (app: App, ctx?: any) => {
  if (IS_DEVELOPMENT) {
    return
  }

  ctx.out.webAppManifest = (html: string) =>
    html.replace(
      '<head>',
      `<head>\n
      <link rel="manifest" href="/manifest.webmanifest">`,
    )
}
