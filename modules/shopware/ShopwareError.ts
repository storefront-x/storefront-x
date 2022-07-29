export default class ShopwareError extends Error {
  constructor(err: any) {
    super(err.detail)
    this.name = err.title
  }
}
