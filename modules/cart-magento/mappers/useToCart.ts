import useToCartItem from '#ioc/mappers/useToCartItem'

export default () => {
  const toCartItem = useToCartItem()

  return (data: any) => ({
    id: data.id as string,
    items: data.items.map(toCartItem),
  })
}
