const intl = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const intlNumber = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export default (value) => intl.format(value).replace(/,00/, '')

export const noSign = (value) => intlNumber.format(value).replace(/,00/, '')
