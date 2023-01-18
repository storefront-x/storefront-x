import ToProduct from '#ioc/mappers/ToProduct'
import ToMoney from '#ioc/mappers/ToMoney'
import ToBundleItem from '#ioc/mappers/ToBundleItem'
import ToConfigurableOption from '#ioc/mappers/ToConfigurableOption'
import ToVariant from '#ioc/mappers/ToVariant'
import ToOptions from '#ioc/mappers/ToOptions'
import ToGroupedItem from '#ioc/mappers/ToGroupedItem'

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
    title: data.meta_title ?? '',
    description: data.meta_description ?? '',
    keywords: data.meta_keyword ?? '',
  },
  images: (data.media_gallery ?? []).filter((item: any) => !item.disabled),
  mediaGallery: (data.media_gallery ?? []).filter((item: any) => !item.disabled),
  crossSellProducts: (data.related_products ?? []).map(ToProduct),
  upsellProducts: (data.upsell_products ?? []).map(ToProduct),
  bundleItems: (data.items ?? []).map(ToBundleItem(data.price_range?.minimum_price?.final_price?.currency)),
  configurableOptions: (data.configurable_options ?? []).map(ToConfigurableOption),
  configurableOptionsCount: data.configurable_options?.length,
  variants: (data.variants ?? []).map(ToVariant),
  options: data.options?.map(ToOptions),
  groupedItems: data.items?.map(ToGroupedItem),
})
