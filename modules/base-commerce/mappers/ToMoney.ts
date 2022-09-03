import PRICE_OFFSET from '#ioc/config/PRICE_OFFSET'

interface Data {
  value: number
  currency?: string
}

export default (data: Data) => ({
  value: Math.round(Number(data.value) * PRICE_OFFSET) || 0,
  currency: data.currency,
})
