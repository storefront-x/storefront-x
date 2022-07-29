import useToBreadcrumb from '#ioc/mappers/useToBreadcrumb'
import useToMoney from '#ioc/mappers/useToMoney'

export default () => {
  const toMoney = useToMoney()

  return (data: any) => ({
    id: data.id as string,
    sku: data.productNumber as string,
    name: (data.name ?? data.productNumber) as string,
    urlKey: data.id as string,
    urlPath: '/' + data.seoUrls[0].seoPathInfo,
    thumbnailUrl: data.cover.media.url as string,
    description: data.description as string,
    shortDescriptionHtml: '',
    finalPrice: toMoney({ value: data.calculatedPrice.unitPrice }),
    regularPrice: toMoney({ value: data.calculatedPrice.regulationPrice ?? data.calculatedPrice.unitPrice }),
    breadcrumbs: getBreadcrumbs(data),
    available: true,
  })
}

const getBreadcrumbs = (data: any) => {
  const breadcrumbs: ReturnType<ReturnType<typeof useToBreadcrumb>>[] = []

  const breadcrumb = data.seoCategory?.breadcrumb.slice(2, data.seoCategory?.breadcrumb.length) ?? []
  const paths = data.seoCategory?.seoUrls[0].seoPathInfo.split('/') ?? []

  for (const [i] of breadcrumb.entries()) {
    breadcrumbs.push({
      title: breadcrumb[i],
      link: '/' + paths[i],
    })
  }

  return breadcrumbs
}
