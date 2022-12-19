import ToChildSku from '#ioc/mappers/ToChildSku'
import useMagento from '#ioc/composables/useMagento'
import GetPickupLocations from '#ioc/graphql/queries/GetPickupLocations'
import ToPickupLocation from '#ioc/mappers/ToPickupLocation'

export default () => {
  const magento = useMagento()

  return async (childItems: ReturnType<typeof ToChildSku>[]) => {
    const productsInfo = childItems.map((cartItem) => ({ sku: cartItem.sku }))

    const { data } = await magento.graphql(GetPickupLocations().with({ productsInfo }))
    console.log('pickuplocations', data.pickupLocations.items)
    return {
      pickupLocations: (data.pickupLocations.items as any[]).map(ToPickupLocation),
    }
  }
}
