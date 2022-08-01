import useToMoney from '#ioc/mappers/useToMoney'

export default (money: ReturnType<ReturnType<typeof useToMoney>>, multiplier: number) => {
  return {
    value: money.value * multiplier,
    currency: money.currency,
  }
}
