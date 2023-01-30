import NProgress from 'nprogress'

export default () => {
  return () => {
    NProgress.done()
  }
}
