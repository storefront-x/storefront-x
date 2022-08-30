export default () => {
  return (data: any) => ({
    code: data.base_currency_code,
    availableCurrencyCodes: data.available_currency_codes,
  })
}
