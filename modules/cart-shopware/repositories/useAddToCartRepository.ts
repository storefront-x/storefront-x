import useShopware from '#ioc/composables/useShopware'
import useToProduct from '#ioc/mappers/useToProduct'
import useToCartItem from '#ioc/mappers/useToCartItem'
import useCartStore from '#ioc/stores/useCartStore'
import useToCartPrices from '#ioc/mappers/useToCartPrices'

interface Options {
  quantity?: number
}

export default () => {
  const shopware = useShopware()
  const cartStore = useCartStore()
  const toProduct = useToProduct()
  const toCartItem = useToCartItem()
  const toCartPrices = useToCartPrices()

  return async (
    product: ReturnType<typeof toProduct>,
    options: Options = {},
  ): Promise<{
    items: ReturnType<typeof toCartItem>[]
    prices: ReturnType<typeof toCartPrices>
  }> => {
    const quantity = options.quantity ?? 1

    for (const item of cartStore.items) {
      if (item.product.id === product.id) {
        const response = await shopware.patch('/checkout/cart/line-item', {
          items: [
            {
              id: item.id,
              quantity: item.quantity + quantity,
            },
          ],
        })

        return {
          items: response.lineItems.map(toCartItem),
          prices: toCartPrices(response.price),
        }
      }
    }

    const response = await shopware.post('/checkout/cart/line-item', {
      items: [
        {
          referencedId: product.id,
          quantity: quantity,
          type: 'product',
        },
      ],
    })

    return {
      items: response.lineItems.map(toCartItem),
      prices: toCartPrices(response.price),
    }
  }
}
