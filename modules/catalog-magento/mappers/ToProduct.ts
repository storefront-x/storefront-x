import ToProduct from '#ioc/mappers/ToProduct'
import ToMoney from '#ioc/mappers/ToMoney'
import ToBundleItem from '#ioc/mappers/ToBundleItem'
import ToConfigurableOption from '#ioc/mappers/ToConfigurableOption'

export default (data: any) => ({
  __typename: data.__typename ?? '',
  id: (data.id ?? 0) as number,
  sku: (data.sku ?? '') as string,
  name: (data.name ?? '') as string,
  categories: data.categories ?? [],
  urlKey: (data.url_key ?? '') as string,
  thumbnailUrl: (data.thumbnail?.url ?? '') as string,
  descriptionHtml: (data.description?.html ?? '') as string,
  shortDescriptionHtml: (data.short_description?.html ?? '') as string,
  minimumPrice: ToMoney(data.price_range?.minimum_price?.final_price ?? { value: 0 }),
  finalPrice: ToMoney(data.price_range?.minimum_price?.final_price ?? {}),
  regularPrice: ToMoney(data.price_range?.minimum_price?.regular_price ?? {}),
  breadcrumbs: [],
  available: (data.stock_status === 'IN_STOCK' ?? false) as boolean,
  meta: {
    description: data.description?.html ?? '',
  },
  images: (data.media_gallery ?? []).filter((item: any) => !item.disabled),
  mediaGallery: (data.media_gallery ?? []).filter((item: any) => !item.disabled),
  crossSellProducts: (data.related_products ?? []).map(ToProduct),
  upsellProducts: (data.upsell_products ?? []).map(ToProduct),
  bundleItems: (data.items ?? []).map(ToBundleItem(data.price_range?.minimum_price?.final_price?.currency)),
  configurableOptions: (data.configurable_options ?? []).map(ToConfigurableOption),
  configurableOptionsCount: data.configurable_options?.length,
})
