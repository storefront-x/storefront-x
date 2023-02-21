import type { App } from 'vue'

export const after = async (app: App, ctx?: any) => {
  ctx.out.webAppManifest = (html: string) =>
    html.replace(
      '<head>',
      `<head>\n
      <link rel="manifest" href="/manifest.webmanifest">`,
    )
}
