import useMagento from '#ioc/composables/useMagento'
import GetPickupLocations from '#ioc/graphql/queries/GetPickupLocations'
import ToCartItem from '#ioc/mappers/ToCartItem'
import ToPickupLocation from '#ioc/mappers/ToPickupLocation'

export default () => {
  const magento = useMagento()

  return async (cartItems: ReturnType<typeof ToCartItem>[]) => {
    const productsInfo = cartItems.map((cartItem) => ({ sku: cartItem.product.sku }))
    console.log('cartItems pickup lo', cartItems)
    const { data } = await magento.graphql(GetPickupLocations().with({ productsInfo }))
    console.log('pickuplocations', data.pickupLocations.items)
    return {
      pickupLocations: (data.pickupLocations.items as any[]).map(ToPickupLocation),
    }
  }
}
