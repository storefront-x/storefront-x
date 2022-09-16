import ToProduct from '#ioc/mappers/ToProduct'

export default (data: any) => ({
  __typename: data.__typename ?? '',
  id: data.id ?? 0,
  position: data.position ?? 0,
  product: ToProduct(data.product ?? []),
  quantity: data.qty ?? 0,
  urlKey: data.url_key ?? '',
})
