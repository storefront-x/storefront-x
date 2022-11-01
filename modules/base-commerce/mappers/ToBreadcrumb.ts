import Breadcrumb from '#ioc/types/base-commerce/Breadcrumb'

interface BreadcrumbData {
  title: string
  link: string
}

export default (data: BreadcrumbData): Breadcrumb => ({
  title: data.title,
  link: data.link,
})
