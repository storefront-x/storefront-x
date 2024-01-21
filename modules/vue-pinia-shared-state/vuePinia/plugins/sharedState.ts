import { PiniaSharedState } from 'pinia-shared-state'

export default (pinia: any) => {
  pinia.use(
    PiniaSharedState({
      enable: true,
      initialize: false,
    }),
  )
}
