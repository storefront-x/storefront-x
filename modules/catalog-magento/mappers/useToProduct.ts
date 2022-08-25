import useToMoney from '#ioc/mappers/useToMoney'

export default () => {
  const toMoney = useToMoney()
  const toProduct = _useToProduct()

  return (data: any) => ({
    __typename: data.__typename ?? '',
    id: data.id ?? 0,
    sku: data.sku ?? '',
    name: data.name ?? '',
    urlKey: data.url_key ?? '',
    thumbnailUrl: data.thumbnail?.url ?? '',
    description: data.description?.html ?? '',
    shortDescriptionHtml: data.short_description?.html ?? '',
    finalPrice: toMoney(data.price_range?.minimum_price?.final_price) ?? 0,
    regularPrice: toMoney(data.price_range?.minimum_price?.regular_price) ?? 0,
    breadcrumbs: [],
    crossSellProducts: ((data?.related_products ?? []) as any[]).map(toProduct),
    upsellProducts: ((data?.upsell_products ?? []) as any[]).map(toProduct),
    available: data.stock_status === 'IN_STOCK' ?? false,
    meta: {
      description: data.description?.html ?? '',
    },
    images: (data.media_gallery ?? []).filter((item: any) => !item.disabled),
  })
}

const _useToProduct = () => {
  const toMoney = useToMoney()

  return (data: any) => ({
    __typename: data.__typename ?? '',
    id: data.id ?? 0,
    sku: data.sku ?? '',
    name: data.name ?? '',
    urlKey: data.url_key ?? '',
    thumbnailUrl: data.thumbnail?.url ?? '',
    description: data.description?.html ?? '',
    shortDescriptionHtml: data.short_description?.html ?? '',
    finalPrice: toMoney(data.price_range?.minimum_price?.final_price) ?? 0,
    regularPrice: toMoney(data.price_range?.minimum_price?.regular_price) ?? 0,
    breadcrumbs: [],
    available: data.stock_status === 'IN_STOCK' ?? false,
    meta: {
      description: data.description?.html ?? '',
    },
    images: (data.media_gallery ?? []).filter((item: any) => !item.disabled),
  })
}
