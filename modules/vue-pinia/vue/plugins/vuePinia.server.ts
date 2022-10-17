import type { App } from 'vue'
import { uneval } from 'devalue'

export const after = async (app: App, ctx?: any) => {
  const rendered = uneval(ctx.$pinia.state.value ?? {})

  ctx.out.pinia = (html: string) => html.replace('</body>', `<script>window.$pinia=${rendered}</script>\n</body>`)
}
