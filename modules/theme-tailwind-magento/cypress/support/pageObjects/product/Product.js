import uniqueNumber from '#ioc/utils/number/unique'

export default class Product {
  static Simple = 'SimpleProduct'

  constructor() {
    this.data = null

    this.type = this.Simple

    this.reviewContent = {
      nickname: 'nickname' + uniqueNumber(),
      title: 'Very nice product',
      text: 'Very nice product, thank you StorefrontX for quick delivery and support',
    }

    this._products = null
  }
}
