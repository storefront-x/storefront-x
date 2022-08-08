import PRICE_OFFSET from '#ioc/config/PRICE_OFFSET'

export default () => (data: any) => ({
  value: Math.round(Number(data?.value) * PRICE_OFFSET) || 0,
  currency: data?.currency,
})
