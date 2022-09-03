const lowerCase = /[a-z]/
const upperCase = /[A-Z]/
const digit = /[0-9]/
const special = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/

export default function classes(value: any, n: number) {
  let classes = 0

  if (lowerCase.test(value)) classes++
  if (upperCase.test(value)) classes++
  if (digit.test(value)) classes++
  if (special.test(value)) classes++

  return classes >= n || 'Value does not meet the complexity criteria.'
}
