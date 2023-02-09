import type { App } from 'vue'
import runtimeConfig from '~/.sfx/runtime/config'

export default async (app: App, ctx: any) => {
  ctx.out.runtimeConfig = (html: string) =>
    html.replace('</body>', `<script>window.$runtimeConfig=${JSON.stringify(runtimeConfig)}</script>\n</body>`)
}
