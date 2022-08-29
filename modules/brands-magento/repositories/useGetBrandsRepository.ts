import useMagento from '#ioc/composables/useMagento'
import BrandList from '#ioc/graphql/queries/BrandList'
import useToBrand from '#ioc/mappers/useToBrand'

export default () => {
  const magento = useMagento()
  const toBrand = useToBrand()

  return async (): Promise<{
    brands: ReturnType<typeof toBrand>[]
  }> => {
    const { data } = await magento.graphql(BrandList())

    return {
      brands: data.ambrandlist.items.map(toBrand),
    }
  }
}
