import type { App } from 'vue'
import devalue from 'devalue'

export const after = async (app: App, ctx?: any) => {
  const rendered = devalue(ctx.$pinia.state.value ?? {})

  ctx.out.pinia = (html: string) => html.replace('</body>', `<script>window.$pinia=${rendered}</script></body>`)
}
