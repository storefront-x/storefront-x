export default () => {
  return (data: any) => ({
    copyright: data.copyright || '',
    baseCurrencyCode: data.base_currency_code || 'EUR',
  })
}
