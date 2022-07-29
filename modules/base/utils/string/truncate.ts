import isString from '#ioc/utils/isString'

export default (str: string, length: number, placeholder = '...') => {
  if (!isString(str)) return ''

  if (str.length <= length) return str

  const words = str.split(' ')
  let result = words.shift()

  if (words.length && `${result}${placeholder}`.length > length) return placeholder

  for (const word of words) {
    if (`${result} ${word}${placeholder}`.length > length) break

    if (result !== '') result += ' '
    result += word
  }

  return result + placeholder
}
