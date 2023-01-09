export default (src: string) => {
  if (src.startsWith('/')) {
    return 'magento::' + src
  } else {
    // Already contains domain
    return src
  }
}
