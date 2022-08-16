import useShopware from '#ioc/composables/useShopware'

export default () => {
  const shopware = useShopware()

  return async (id: string) => {
    const response: any = await shopware.post(`/landing-page/${id}`, {
      includes: {
        cms_page: ['sections'],
        cms_section: ['blocks'],
        cms_block: [
          'slots',
          'type',
          'backgroundMedia',
          'backgroundMediaMode',
          'backgroundColor',
          'marginTop',
          'marginBottom',
          'marginLeft',
          'marginRight',
          'cssClass',
        ],
        cms_slot: ['data', 'config', 'type', 'slot'],
      },
    })

    return {
      sections: response.cmsPage.sections,
    }
  }
}
