import field from '#ioc/graphql/field'
import addFields from '#ioc/utils/graphql/addFields'

export default (self: any) => {
  return () => {
    const fragment = self()
    addFields(fragment, {
      sfx_attributes: field({
        attribute_code: field(),
        frontend_label: field(),
        value: field(),
        attribute_options: field({
          options_id: field(),
          option_value: field(),
        }),
      }),
    })

    return fragment
  }
}
