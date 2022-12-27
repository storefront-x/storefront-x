import useShopware from '#ioc/composables/useShopware'

export default () => {
  const shopware = useShopware()

  return async (path = 'home') => {
    // TODO fix this mess
    if (path === '' || path === '/' || path === 'undefined') {
      path = 'home'
    }
    const pathForeignKey = path.includes('p/') ? path.replace(/p\//, '') : null
    const queries = [
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
    ]
    if (pathForeignKey) {
      queries.push({
        type: 'equals',
        field: 'foreignKey',
        value: pathForeignKey,
      })
    }
    const { elements }: any = await shopware.post('/seo-url', {
      filter: [
        {
          type: 'multi',
          operator: 'or',
          queries: queries,
        },
      ],
    })
    return {
      foreignKey: elements[0]?.foreignKey as string,
      ident: elements[0]?.routeName as string,
      seoPath: elements[0]?.seoPathInfo === 'home' ? '/' : (('/' + elements[0].seoPathInfo) as string),
    }
  }
}
