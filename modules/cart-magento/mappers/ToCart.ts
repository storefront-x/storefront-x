import ToCartItem from '#ioc/mappers/ToCartItem'
import ToCartPrices from '#ioc/mappers/ToCartPrices'
import ToCartCoupon from '#ioc/mappers/ToCartCoupon'
import ToChildSku from '#ioc/mappers/ToChildSku'

export default (data: any) => ({
  id: data.id as string,
  items: data.items.map(ToCartItem),
  coupons: data.applied_coupons?.map(ToCartCoupon) ?? [],
  prices: ToCartPrices(data.prices),
  childItems: data?.child_skus?.map(ToChildSku) ?? [],
})
