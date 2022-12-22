import useShopware from '#ioc/composables/useShopware'
import ToProduct from '#ioc/mappers/ToProduct'
import ToCart from '#ioc/mappers/ToCart'
import useCartStore from '#ioc/stores/useCartStore'

interface Options {
  quantity?: number
}

const productPaths: {
  id: string
  path: string
}[] = []

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

        const lineItems = response.lineItems?.map((entry: any) => {
          for (const path of productPaths) {
            if (path.id === entry.referencedId) {
              entry.urlPath = path.path ?? ''
              break
            }
          }
          return entry
        })
        response.lineItems = lineItems

        return {
          cart: ToCart(response),
        }
      }
    }

    productPaths.push({
      id: product.id,
      path: product.urlPath,
    })

    const response = await shopware.post('/checkout/cart/line-item', {
      items: [
        {
          referencedId: product.id,
          quantity: quantity,
          type: 'product',
        },
      ],
    })

    const lineItems = response.lineItems?.map((entry: any) => {
      for (const path of productPaths) {
        if (path.id === entry.referencedId) {
          entry.urlPath = path.path ?? ''
          break
        }
      }
      return entry
    })
    response.lineItems = lineItems

    return {
      cart: ToCart(response),
    }
  }
}
