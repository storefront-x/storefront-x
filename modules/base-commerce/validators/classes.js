const lowerCase = /[a-z]/
const upperCase = /[A-Z]/
const digit = /[0-9]/
const special = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/

export default function classes(value, n) {
  let classes = 0

  if (lowerCase.test(value)) classes++
  if (upperCase.test(value)) classes++
  if (digit.test(value)) classes++
  if (special.test(value)) classes++

  return classes >= n || this.$t('validators.classes', [classes])
}
