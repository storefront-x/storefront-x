export default (self) => {
  self.push({
    urlPattern: /\/_shopware\//,
    handler: 'NetworkFirst',
  })

  return self
}
