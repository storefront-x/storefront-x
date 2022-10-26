import PRICE_OFFSET from '#ioc/config/PRICE_OFFSET'
import ToMoneyData from '#ioc/types/base-commerce/ToMoneyData'

export default (data: ToMoneyData) => ({
  value: Math.round(Number(data.value) * PRICE_OFFSET) || 0,
  currency: data.currency,
})
