import PlaceOrder from '#ioc/bus/events/PlaceOrder'
import PRICE_OFFSET from '#ioc/config/PRICE_OFFSET'

export default () => {
  return ({
    cart: { items, discounts, subtotalIncludingTax, coupons, taxes },
    shipping: { shippingMethod },
    order: { orderNumber },
  }: PlaceOrder) => {
    const products = []
    let totalDiscount = 0
    let totalTax = 0
    const totalShipping = shippingMethod?.priceInclTax?.value ?? 0

    if (discounts.length) {
      for (const discount of discounts) {
        totalDiscount += discount.amount.value
      }
    }

    if (taxes.length) {
      for (const tax of taxes) {
        totalTax += tax.amount.value
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

    window.gtag('event', 'purchase', {
      currency: subtotalIncludingTax?.currency,
      value: subtotalIncludingTax?.value && (subtotalIncludingTax.value - totalDiscount + totalShipping) / PRICE_OFFSET,
      items: products,
      shipping: totalShipping / PRICE_OFFSET,
      tax: totalTax && totalTax / PRICE_OFFSET,
      coupon: coupons.length ? coupons[0].code : '',
      transaction_id: orderNumber,
    })
  }
}
