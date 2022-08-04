import useShopware from '#ioc/composables/useShopware'

export default () => {
  const shopware = useShopware()

  return async (path: string) => {
    const { elements }: any = await shopware.post('/seo-url', {
      filter: [
        {
          type: 'prefix',
          field: 'seoPathInfo',
          value: path,
        },
      ],
    })

    return {
      foreignKey: elements[0].foreignKey as string,
      ident: elements[0].routeName as string,
    }
  }
}
