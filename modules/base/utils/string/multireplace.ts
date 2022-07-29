export default (str: string, index: any) => {
  const pattern = Object.keys(index).join('|')

  return str.replace(new RegExp(pattern, 'g'), ($0) => index[$0] ?? $0)
}
