interface ProductItem {
  currency: string
  value: number
  items: {
    item_id: string
    item_name: string
    affiliation?: string
    discount?: number
    item_brand?: string
    item_category?: string
    item_category2?: string
    item_category3?: string
    item_category4?: string
    item_category5?: string
    price?: number
    product_type: string
  }[]
}

export default function (item: ProductItem) {
  gtag('event', 'view_item', item)
}
