import field from '#ioc/graphql/field'
import addFields from '#ioc/utils/graphql/addFields'

export default (PlaceOrder: any) => () => {
  const self = PlaceOrder()

  addFields(self, 'placeOrder.order', {
    redirect_url: field(),
  })

  return self
}
