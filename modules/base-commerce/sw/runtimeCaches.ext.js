export default (self) => {
  self.push({
    urlPattern: /\/_i\//,
    handler: 'CacheFirst',
  })

  return self
}
