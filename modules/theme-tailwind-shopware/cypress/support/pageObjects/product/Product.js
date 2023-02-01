export default class Product {
  constructor(params = {}) {
    this.productname = params.productname ?? '3M 6531B self-adhesive note paper Rectangle Yellow 100 sheets'
    this.url_key = params.url_key ?? '/3m-6531b-self-adhesive-note-paper-rectangle-yellow-100-sheets/ZMQ2141'
    this.product_SKU = params.product_SKU ?? 'ZMQ2141'
    this.product_price = params.product_price ?? '€3420.00'
  }
}
