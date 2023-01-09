import ProductDetail from '#ioc/bus/events/ProductDetail'

export default (product: ProductDetail) => {
  console.log(['GTAG emit', product])
}
