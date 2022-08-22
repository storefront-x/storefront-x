import useShopware from '#ioc/composables/useShopware'
import useToProduct from '#ioc/mappers/useToProduct'
import useToCart from '#ioc/mappers/useToCart'
import useCartStore from '#ioc/stores/useCartStore'

interface Options {
  quantity?: number
}

export default () => {
  const shopware = useShopware()
  const cartStore = useCartStore()
  const toProduct = useToProduct()
  const toCart = useToCart()

  return async (
    product: ReturnType<typeof toProduct>,
    options: Options = {},
  ): Promise<{
    cart: ReturnType<typeof toCart>
  }> => {
    const quantity = options.quantity ?? 1

    for (const item of cartStore.cart?.items ?? []) {
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
          cart: toCart(response),
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
      cart: toCart(response),
    }
  }
}
