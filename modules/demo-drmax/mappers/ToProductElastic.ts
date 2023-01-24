import ToProduct from '#ioc/mappers/ToProduct'
import ToMoney from '#ioc/mappers/ToMoney'
import ToBundleItem from '#ioc/mappers/ToBundleItem'
import ToConfigurableOption from '#ioc/mappers/ToConfigurableOption'
import ToVariant from '#ioc/mappers/ToVariant'
import ToOptions from '#ioc/mappers/ToOptions'
import ToGroupedItem from '#ioc/mappers/ToGroupedItem'
import ToMagentoImage from '#ioc/mappers/ToMagentoImage'

export default (data: any) => ({
  __typename: data.__typename ?? '',
  id: (data.product_id ?? 0) as number,
  sku: (data.sku ?? '') as string,
  name: (data.name ?? '') as string,
  label: (data.attribute_set_label ?? '') as string,
  categories: data.category ?? [],
  urlKey: (data.url_key ?? '') as string,
  brandName: (data.brand_name ?? '') as string,
  thumbnailUrl: ToMagentoImage('/media/catalog/product' + data.thumbnail) as string,
  descriptionHtml: (data.drmax_desc_introduction ?? '') as string,
  shortDescriptionHtml: (data.short_description ?? '') as string,
  minimumPrice: ToMoney({ value: data.drmax_lowest_price_30 ?? 0 }),
  finalPrice: ToMoney({ value: data.final_price ?? 0 }),
  regularPrice: ToMoney({ value: data.regular_price ?? 0 }),
  breadcrumbs: [],
  available: (data.drmax_stock_availability_text_value === 'Skladem na e-shopu') as boolean,
  meta: {
    title: data.drmax_title_row1 ?? '',
    description: data.short_description ?? '',
    keywords: data.meta_keyword ?? '',
  },
  images: (data.media_gallery ?? []).map((item: any) => ({
    url: ToMagentoImage('/media/catalog/product' + item.image),
    id: item.lab,
  })),
  mediaGallery: (data.media_gallery ?? []).map((item: any) => ({
    url: ToMagentoImage('/media/catalog/product' + item.image),
    id: item.lab,
  })),
  crossSellProducts: (data.related_products ?? []).map(ToProduct),
  upsellProducts: (data.upsell_products ?? []).map(ToProduct),
  bundleItems: (data.items ?? []).map(ToBundleItem(data.price_range?.minimum_price?.final_price?.currency)),
  configurableOptions: (data.configurable_options ?? []).map(ToConfigurableOption),
  configurableOptionsCount: data.configurable_options?.length,
  variants: (data.variants ?? []).map(ToVariant),
  options: data.options?.map(ToOptions),
  groupedItems: data.items?.map(ToGroupedItem),
})
