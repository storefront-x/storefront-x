import useMagento from '#ioc/composables/useMagento'
import GetPickupLocations from '#ioc/graphql/queries/GetPickupLocations'
import ToCartItem from '#ioc/mappers/ToCartItem'
import ToPickupLocation from '#ioc/mappers/ToPickupLocation'

export default () => {
  const magento = useMagento()

  return async (cartItems: ReturnType<typeof ToCartItem>[]) => {
    const productsInfo = cartItems.map((cartItem) => ({ sku: cartItem.product.sku }))

    const { data } = await magento.graphql(GetPickupLocations().with({ productsInfo }))

    return {
      pickupLocations: (data.pickupLocations.items as any[]).map(ToPickupLocation),
    }
  }
}
