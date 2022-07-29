export default (string: string) => {
  const pattern = '<\\w+(\\s+("[^"]*"|\\\'[^\\\']*\'|[^>])+)?>|<\\/\\w+>'
  const reg = new RegExp(pattern, 'gi')
  return string.replace(reg, '')
}
