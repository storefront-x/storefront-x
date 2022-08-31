const intl = new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK' })
const intlNumber = new Intl.NumberFormat('cs-CZ', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export default (value) => intl.format(value).replace(/,00/, '')

export const noSign = (value) => intlNumber.format(value).replace(/,00/, '')
