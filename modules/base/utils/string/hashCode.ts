/**
 * Returns hash code of a string
 *
 * @see https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */
export default (value: string): number => {
  let hash = 0

  if (typeof value !== 'string' || value.length === 0) return hash

  for (let i = 0; i < value.length; i++) {
    const char = value.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0
  }

  return hash
}
