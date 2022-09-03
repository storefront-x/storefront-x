import ToMoney from '#ioc/mappers/ToMoney'

export default (money: ReturnType<typeof ToMoney>, multiplier: number) => {
  return {
    value: money.value * multiplier,
    currency: money.currency,
  }
}
