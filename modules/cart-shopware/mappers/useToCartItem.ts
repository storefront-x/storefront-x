import useToMoney from '#ioc/mappers/useToMoney'
import useToProduct from '#ioc/mappers/useToProduct'
import gift from '#ioc/assets/cart/gift'

export default () => {
  const toMoney = useToMoney()
  const toProduct = useToProduct()

  return (data: any) => ({
    id: data.id as string,
    quantity: data.quantity as number,
    price: toMoney({ value: data.price.unitPrice }),
    rowTotal: toMoney({ value: data.price.totalPrice }),
    stackable: data.stackable as boolean, // Can the quantity be modified?
    product: {
      id: data.referencedId as string,
      name: data.label as string,
      urlKey: data.referencedId as string,
      urlPath: `/p/${data.referencedId}`,
      thumbnailUrl: (data.cover?.url ?? gift) as string,
    } as ReturnType<typeof toProduct>,
  })
}
