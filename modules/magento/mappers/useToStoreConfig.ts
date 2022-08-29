export default () => {
  return (data: any) => ({
    copyright: data.copyright || '',
    baseCurrencyCode: {
      code: data.base_currency_code || 'EUR',
    },
  })
}
