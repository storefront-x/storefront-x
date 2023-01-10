import PageView from '#ioc/bus/events/PageView'

export default (product: PageView) => {
  console.log(['HOTJAR emit', product])
}
