export default (value) => (value < 0 ? '-' : '') + '€' + value.toFixed(2)
