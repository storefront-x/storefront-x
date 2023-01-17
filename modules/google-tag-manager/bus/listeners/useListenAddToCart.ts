import AddToCart from '#ioc/bus/events/AddToCart'
import PRICE_OFFSET from '#ioc/config/PRICE_OFFSET'

export default () => {
  return ({ product, quantity }: AddToCart) => {
    dataLayer.push({ ecommerce: null })
    dataLayer.push({
      event: 'add_to_cart',
      ecommerce: {
        currency: product.finalPrice?.currency ?? '',
        value: +product.finalPrice.value / PRICE_OFFSET,
        items: [
          {
            item_id: product.sku,
            item_name: product.name,
            // affiliation: 'Google Merchandise Store',
            discount:
              product.finalPrice?.value !== product.regularPrice?.value
                ? (+product.regularPrice.value - +product.finalPrice.value) / PRICE_OFFSET
                : 0,
            item_brand: product.brand ?? '',
            item_category: product.categories?.at(0)?.name ?? '',
            item_category2: product.categories?.at(1)?.name ?? '',
            item_category3: product.categories?.at(2)?.name ?? '',
            item_category4: product.categories?.at(3)?.name ?? '',
            item_category5: product.categories?.at(4)?.name ?? '',
            price: +product.regularPrice.value / PRICE_OFFSET,
            quantity: quantity ?? 1,
          },
        ],
        product_type: product.productType ?? '',
      },
    })

    console.log('Tag Manager (add to cart) emit')
  }
}
