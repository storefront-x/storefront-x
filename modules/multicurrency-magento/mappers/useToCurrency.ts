import useToAvailableCurrencyCode from '#ioc/mappers/useToAvailableCurrencyCode'

export default () => {
  const toAvailableCurrencyCode = useToAvailableCurrencyCode()
  return (data: any) => ({
    code: data.base_currency_code,
    availableCurrencyCodes: data.available_currency_codes.map(toAvailableCurrencyCode),
  })
}
