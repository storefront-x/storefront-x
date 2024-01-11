import { PiniaSharedState } from 'pinia-shared-state'
import type { App } from 'vue'

export default (app: App, ctx: any) => {
  const pinia = ctx.$pinia

  pinia.use(
    PiniaSharedState({
      enable: true,
      initialize: false,
    }),
  )
}
