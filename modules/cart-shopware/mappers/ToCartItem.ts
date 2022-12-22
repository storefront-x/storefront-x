import ToMoney from '#ioc/mappers/ToMoney'
import ToProduct from '#ioc/mappers/ToProduct'
import gift from '#ioc/assets/cart/gift'

export default (data: any) => ({
  id: data.id as string,
  quantity: data.quantity as number,
  price: ToMoney({ value: data.price.unitPrice }),
  rowTotal: ToMoney({ value: data.price.totalPrice }),
  stackable: data.stackable as boolean, // Can the quantity be modified?
  product: {
    id: data.referencedId as string,
    name: data.label as string,
    urlKey: data.referencedId as string,
    urlPath: (data.urlPath as string) ?? '',
    thumbnailUrl: (data.cover?.url ?? gift) as string,
  } as ReturnType<typeof ToProduct>,
})
