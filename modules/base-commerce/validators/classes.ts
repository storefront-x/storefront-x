const lowerCase = /[a-z]/
const upperCase = /[A-Z]/
const digit = /[0-9]/
const special = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/

export default function max(value: any, n: number) {
  let classes = 0

  if (lowerCase.test(value)) classes++
  if (upperCase.test(value)) classes++
  if (digit.test(value)) classes++
  if (special.test(value)) classes++

  // return classes >= n || this.$t('Minimum {0} classes', [n])
  return classes >= n || 'Password should contain at least one digit, capital letter and one special character.'
}
