import useShopware from '#ioc/composables/useShopware'
import ToProduct from '#ioc/mappers/ToProduct'

export default () => {
  const shopware = useShopware()

  return async (
    ids: string[],
  ): Promise<{
    products: ReturnType<typeof ToProduct>[]
  }> => {
    const response = await shopware.post(`/product`, {
      ids: ids,
    })

    return {
      products: response.elements.map(ToProduct),
    }
  }
}
