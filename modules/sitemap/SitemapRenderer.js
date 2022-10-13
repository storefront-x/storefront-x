import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'

export default class SitemapRenderer {
  withStore(store) {
    this._store = store

    return this
  }

  withUrls(urls) {
    this._urls = urls

    return this
  }

  withHostname(hostname) {
    this._hostname = hostname

    return this
  }

  render() {
    const renderedUrlset = this._renderUrlset()

    return `<?xml version="1.0" encoding="UTF-8"?>${renderedUrlset}`
  }

  _renderUrlset() {
    const renderedUrls = this._urls.map((url) => this._renderUrl(url)).join('')

    return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${renderedUrls}</urlset>`
  }

  _renderUrl(url) {
    const loc = this._normalizeUrl(url.loc)

    return `<url><loc>${loc}</loc></url>`
  }

  _normalizeUrl(url) {
    if (url.startsWith('/')) {
      const domain = `https://${this._hostname}`
      const urlPrefix = this._getUrlPrefix()

      return domain + urlPrefix + url
    } else {
      return url
    }
  }

  _getUrlPrefix() {
    if (this._store.name === VUE_I18N_LOCALES[0].name) return ''
    return `/${this._store.name}`
  }
}
