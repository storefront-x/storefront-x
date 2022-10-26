import BreadCrumbData from '#ioc/types/base-commerce/BreadCrumbData'

export default (data: BreadCrumbData) => ({
  title: data.title,
  link: data.link,
})
