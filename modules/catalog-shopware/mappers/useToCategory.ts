import useToBreadcrumb from '#ioc/mappers/useToBreadcrumb'

export default () => (data: any) => ({
  id: data.id as string,
  urlPath: '/' + data.seoUrls[0].seoPathInfo,
  name: data.translated.name as string,
  description: data.translated.description as string | undefined,
  thumbnailUrl: data.media?.url as string | undefined,
  breadcrumbs: getBreadcrumbs(data),
})

const getBreadcrumbs = (data: any) => {
  const breadcrumbs: ReturnType<ReturnType<typeof useToBreadcrumb>>[] = []

  const path = (data?.path?.split('|').filter(Boolean) ?? []).slice(2, data?.path?.split('|').length) as string[]
  const breadcrumb = data?.translated?.breadcrumb.slice(2, data?.translated?.breadcrumb.length)
  const seoPath = data?.seoUrls[0].seoPathInfo.split('/')

  for (const [i] of path.entries()) {
    breadcrumbs.push({
      title: breadcrumb[i],
      link: '/' + seoPath.slice(i, i + 1).join('/'),
    })
  }

  return breadcrumbs
}
