import PRICE_OFFSET from '#ioc/config/PRICE_OFFSET'
import Money from '#ioc/types/base-commerce/Money'

interface ToMoneyData {
  value: number
  currency?: string
}

export default (data: ToMoneyData): Money => ({
  value: Math.round(Number(data.value) * PRICE_OFFSET) || 0,
  currency: data.currency,
})
