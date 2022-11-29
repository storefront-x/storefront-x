const intl = new Intl.NumberFormat('sfb', { style: 'currency', currency: 'EUR' })
const intlNumber = new Intl.NumberFormat('sfb', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export default (value) => intl.format(value).replace(/,00/, '')

export const noSign = (value) => intlNumber.format(value).replace(/,00/, '')
