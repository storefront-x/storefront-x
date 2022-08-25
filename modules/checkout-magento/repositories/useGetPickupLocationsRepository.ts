import useMagento from '#ioc/composables/useMagento'
import GetPickupLocations from '#ioc/graphql/queries/GetPickupLocations'
import useToCartItem from '#ioc/mappers/useToCartItem'
import useToPickupLocation from '#ioc/mappers/useToPickupLocation'

export default () => {
  const magento = useMagento()
  const toPickupLocation = useToPickupLocation()

  return async (cartItems: ReturnType<ReturnType<typeof useToCartItem>>[]) => {
    const productsInfo = cartItems.map((cartItem) => ({ sku: cartItem.product.sku }))

    const { data } = await magento.graphql(GetPickupLocations().with({ productsInfo }))

    return {
      pickupLocations: (data.pickupLocations.items as any[]).map(toPickupLocation),
    }
  }
}
