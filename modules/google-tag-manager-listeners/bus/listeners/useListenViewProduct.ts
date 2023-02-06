import ViewProduct from '#ioc/bus/events/ViewProduct'
import PRICE_OFFSET from '#ioc/config/PRICE_OFFSET'

export default () => {
  return ({ product }: ViewProduct) => {
    window.dataLayer.push({ ecommerce: null })
    window.dataLayer.push({
      event: 'view_item',
      ecommerce: {
        currency: product.finalPrice?.currency ?? '',
        value: +product.finalPrice.value / PRICE_OFFSET,
        items: [
          {
            item_id: product.sku ?? product.id,
            item_name: product.name,
            // affiliation: 'Google Merchandise Store',
            discount:
              product.finalPrice?.value !== product.regularPrice?.value
                ? (+product.regularPrice.value - +product.finalPrice.value) / PRICE_OFFSET
                : 0,
            item_brand: product.brand?.name ?? '',
            item_category: product.categories?.at(0)?.name ?? '',
            item_category2: product.categories?.at(1)?.name ?? '',
            item_category3: product.categories?.at(2)?.name ?? '',
            item_category4: product.categories?.at(3)?.name ?? '',
            item_category5: product.categories?.at(4)?.name ?? '',
            price: product.regularPrice && +product.regularPrice.value / PRICE_OFFSET,
          },
        ],
        product_type: product.productType ?? '',
      },
    })
  }
}
