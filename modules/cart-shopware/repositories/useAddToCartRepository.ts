import useShopware from '#ioc/composables/useShopware'
import ToProduct from '#ioc/mappers/ToProduct'
import ToCart from '#ioc/mappers/ToCart'
import useCartStore from '#ioc/stores/useCartStore'

interface Options {
  quantity?: number
}

export default () => {
  const shopware = useShopware()
  const cartStore = useCartStore()

  return async (
    product: ReturnType<typeof ToProduct>,
    options: Options = {},
  ): Promise<{
    cart: ReturnType<typeof ToCart>
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
          cart: ToCart(response),
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
      cart: ToCart(response),
    }
  }
}
