import useProduct from '#ioc/composables/useProduct'

export default interface BeginCheckout {
  products: {
    product: ReturnType<typeof useProduct>
    quantity: number
  }[]
  subTotal: {
    currency: string
    value: number
  }
  discounts: {
    amount: {
      currency: string
      value: number
    }
  }[]
  coupons: {
    code: string
  }[]
}
