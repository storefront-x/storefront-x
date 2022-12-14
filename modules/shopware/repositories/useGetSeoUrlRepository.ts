import useShopware from '#ioc/composables/useShopware'

export default () => {
  const shopware = useShopware()

  return async (path = 'home') => {
    // TODO fix this mess
    if (path === '' || path === '/' || path === 'undefined') {
      path = 'home'
    }

    const { elements }: any = await shopware.post('/seo-url', {
      filter: [
        {
          type: 'multi',
          operator: 'or',
          queries: [
            {
              type: 'equals',
              field: 'seoPathInfo',
              value: path,
            },
            {
              type: 'equals',
              field: 'seoPathInfo',
              value: path + '/',
            },
            {
              type: 'suffix',
              field: 'pathInfo',
              value: path,
            },
          ],
        },
      ],
    })

    return {
      foreignKey: (elements[0]?.foreignKey as string) ?? null,
      ident: (elements[0]?.routeName as string) ?? null,
      seoPath: elements[0]?.seoPathInfo
        ? elements[0]?.seoPathInfo === 'home'
          ? '/'
          : (('/' + elements[0].seoPathInfo) as string)
        : path,
    }
  }
}
