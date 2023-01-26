import NPROGRESS_BAR_TRICKLE_SPEED from '#ioc/config/NPROGRESS_BAR_TRICKLE_SPEED'
import NProgress from 'nprogress'

export default () => {
  return () => {
    NProgress.configure({ trickleSpeed: NPROGRESS_BAR_TRICKLE_SPEED })
    NProgress.start()
  }
}
