import type { App } from 'vue'
import { uneval } from 'devalue'

export const after = async (app: App, ctx: any) => {
  const rendered = uneval(ctx.$state ?? {})

  ctx.out.state = (html: string) => html.replace('</body>', `<script>window.$state=${rendered}</script>\n</body>`)
}
