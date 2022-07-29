export default (string: string) => {
  const pattern = '<style>.*</style>|<script>.*</script>|<\\w+(\\s+("[^"]*"|\\\'[^\\\']*\'|[^>])+)?>|<\\/\\w+>'
  const reg = new RegExp(pattern, 'gi')
  return string.replace(reg, '')
}
