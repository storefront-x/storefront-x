import ToBreadcrumb from '#ioc/mappers/ToBreadcrumb'
import ToMoney from '#ioc/mappers/ToMoney'

export default (data: any) => ({
  ...toProduct(data),
  crossSellProducts: ((data.crossSell ?? []) as any[]).map(toProduct),
})

const toProduct = (data: any) => ({
  id: data?.id as string,
  sku: data?.productNumber as string,
  name: (data?.name ?? data?.productNumber) as string,
  urlKey: data?.id as string,
  urlPath: '/' + data?.seoUrls[0].seoPathInfo,
  thumbnailUrl: data?.cover.media.url as string,
  description: data?.description as string,
  shortDescriptionHtml: '',
  finalPrice: ToMoney({ value: data?.calculatedPrice?.unitPrice }),
  regularPrice: ToMoney({ value: data?.calculatedPrice?.regulationPrice ?? data?.calculatedPrice?.unitPrice }),
  images: data?.cover.media.thumbnails.map((item: any) => ({
    url: item.url as string,
    id: item.id as string,
  })),
  meta: {
    description: data?.metaDescription as string,
    title: data?.metaTitle as string,
  },
  breadcrumbs: getBreadcrumbs(data),
  available: true,
})

const getBreadcrumbs = (data: any) => {
  const breadcrumbs: ReturnType<typeof ToBreadcrumb>[] = []

  const breadcrumb = data?.seoCategory?.breadcrumb.slice(2, data?.seoCategory?.breadcrumb.length) ?? []
  const seoPath = data?.seoCategory?.seoUrls[0].seoPathInfo.split('/')

  for (const [i] of breadcrumb.entries()) {
    breadcrumbs.push({
      title: breadcrumb[i],
      link: '/' + seoPath.slice(0, i + 1).join('/'),
    })
  }

  return breadcrumbs
}
