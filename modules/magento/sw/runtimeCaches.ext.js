export default (self) => {
  self.push({
    urlPattern: /\/_magento\//,
    handler: 'NetworkFirst',
  })

  return self
}
