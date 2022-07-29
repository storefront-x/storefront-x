import useToCartItem from '#ioc/mappers/useToCartItem'
import useToCartPrices from '#ioc/mappers/useToCartPrices'
import { defineStore } from 'pinia'

export default defineStore('cart', {
  state: () => ({
    items: [] as ReturnType<ReturnType<typeof useToCartItem>>[],
    prices: {} as ReturnType<ReturnType<typeof useToCartPrices>>,
  }),
})
