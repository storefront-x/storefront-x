import BeginCheckout from '#ioc/bus/events/BeginCheckout'
import PRICE_OFFSET from '#ioc/config/PRICE_OFFSET'

export default () => {
  return ({ products, discounts, subTotal: { currency, value }, coupons }: BeginCheckout) => {
    const items = []
    let totalDiscount = 0

    if (discounts.length) {
      for (const discount of discounts) {
        totalDiscount += discount.amount.value
      }
    }

    for (const item of products) {
      const productBrand = item.product.attributes.find((atr) => atr.code === 'brand')

      items.push({
        item_id: item.product.sku,
        item_name: item.product.name,
        // affiliation: 'Google Merchandise Store',
        discount:
          item.product.finalPrice?.value !== item.product.regularPrice?.value
            ? (+item.product.regularPrice.value - +item.product.finalPrice.value) / PRICE_OFFSET
            : 0,
        item_brand: productBrand?.valueLabel ?? '',
        item_category: item.product.categories?.at(0)?.name ?? '',
        item_category2: item.product.categories?.at(1)?.name ?? '',
        item_category3: item.product.categories?.at(2)?.name ?? '',
        item_category4: item.product.categories?.at(3)?.name ?? '',
        item_category5: item.product.categories?.at(4)?.name ?? '',
        price: +item.product.regularPrice.value / PRICE_OFFSET,
        quantity: item.quantity ?? 1,
      })
    }

    gtag('event', 'begin_checkout', {
      currency,
      value: (value - totalDiscount) / PRICE_OFFSET,
      items,
      coupon: coupons.length ? coupons[0].code : '',
    })

    console.log('Google Tag (begin checkout) emit')
  }
}
