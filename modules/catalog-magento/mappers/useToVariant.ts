import useToProduct from '#ioc/mappers/useToProduct'

export default () => {
  const toProduct = useToProduct()
  return (data: any) => ({
    product: data?.product?.map(toProduct) ?? [],
    // attributes: reduce(
    //   data.attributes,
    //   ({ code }) => code,
    //   ({ value_index }) => value_index,
    // ),
  })
}
