import Countries from '#ioc/graphql/queries/Countries'
import useMagento from '#ioc/composables/useMagento'
import ToCountry from '#ioc/mappers/ToCountry'

export default () => {
  const magento = useMagento()

  return async (): Promise<{
    countryList: ReturnType<typeof ToCountry>[]
  }> => {
    const { data, _error } = await magento.graphql(Countries())

    if (_error) {
      throw new Error(_error)
    }

    return {
      countryList: data?.countries?.map(ToCountry) ?? [],
    }
  }
}
