import type { App } from 'vue'
import webAppManifest from '~/.sfx/webAppManifest'

export const after = async (app: App, ctx?: any) => {
  let content = `<link rel="manifest" href="/manifest.webmanifest">`

  if (webAppManifest.theme_color) {
    content += `<meta name="theme-color" content="${webAppManifest.theme_color}" />`
  }

  if (webAppManifest.icons?.length) {
    const icon = webAppManifest.icons[0]

    content += `<link rel="apple-touch-icon" href="${icon.src}" sizes="${icon.sizes}" />`
  }

  ctx.out.webAppManifest = (html: string) => html.replace('</head>', `${content}</head>`)
}
