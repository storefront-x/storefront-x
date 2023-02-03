import BeginCheckout from '#ioc/bus/events/BeginCheckout'
import PRICE_OFFSET from '#ioc/config/PRICE_OFFSET'

export default () => {
  return ({ cart: { items, discounts, subtotalIncludingTax, coupons } }: BeginCheckout) => {
    const products = []
    let totalDiscount = 0

    if (discounts.length) {
      for (const discount of discounts) {
        totalDiscount += discount.amount.value
      }
    }

    for (const item of items) {
      products.push({
        item_id: item.product.sku ?? item.product.id,
        item_name: item.product.name,
        // affiliation: 'Google Merchandise Store',
        discount:
          item.product.finalPrice?.value !== item.product.regularPrice?.value
            ? (+item.product.regularPrice.value - +item.product.finalPrice.value) / PRICE_OFFSET
            : 0,
        item_brand: item.product.brand?.name ?? '',
        item_category: item.product.categories?.at(0)?.name ?? '',
        item_category2: item.product.categories?.at(1)?.name ?? '',
        item_category3: item.product.categories?.at(2)?.name ?? '',
        item_category4: item.product.categories?.at(3)?.name ?? '',
        item_category5: item.product.categories?.at(4)?.name ?? '',
        price: item.product.regularPrice
          ? +item.product.regularPrice.value / PRICE_OFFSET
          : +item.price.value / PRICE_OFFSET,
        quantity: item.quantity ?? 1,
      })
    }

    window.dataLayer.push({ ecommerce: null })
    window.dataLayer.push({
      event: 'begin_checkout',
      ecommerce: {
        currency: subtotalIncludingTax?.currency,
        value: subtotalIncludingTax?.value && (subtotalIncludingTax.value - totalDiscount) / PRICE_OFFSET,
        items: products,
        coupon: coupons.length ? coupons[0].code : '',
      },
    })
  }
}
