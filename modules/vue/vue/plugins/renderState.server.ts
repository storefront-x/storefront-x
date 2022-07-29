import type { App } from 'vue'
import devalue from 'devalue'

export const after = async (app: App, ctx: any) => {
  const rendered = devalue(ctx.$state ?? {})

  ctx.out.state = (html: string) => html.replace('</body>', `<script>window.$state=${rendered}</script></body>`)
}
