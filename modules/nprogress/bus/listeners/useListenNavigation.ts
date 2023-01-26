import Navigation from '#ioc/bus/events/Navigation'
import NPROGRESS_BAR_TRICKLE_SPEED from '#ioc/config/NPROGRESS_BAR_TRICKLE_SPEED'
import NProgress from 'nprogress'

export default () => {
  return ({ isLoading }: Navigation) => {
    if (isLoading) {
      NProgress.configure({ trickleSpeed: NPROGRESS_BAR_TRICKLE_SPEED })
      NProgress.start()
    } else {
      NProgress.done()
    }
  }
}
