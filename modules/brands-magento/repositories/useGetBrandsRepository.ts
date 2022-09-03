import useMagento from '#ioc/composables/useMagento'
import BrandList from '#ioc/graphql/queries/BrandList'
import ToBrand from '#ioc/mappers/ToBrand'

export default () => {
  const magento = useMagento()

  return async (): Promise<{
    brands: ReturnType<typeof ToBrand>[]
  }> => {
    const { data } = await magento.graphql(BrandList())

    return {
      brands: data.ambrandlist.items.map(ToBrand),
    }
  }
}
