import { PiniaSharedState } from 'pinia-shared-state'

export default (ctx: any) => {
  const pinia = ctx.$pinia

  pinia.use(
    PiniaSharedState({
      enable: true,
      initialize: false,
    }),
  )
}
