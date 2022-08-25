import field from '#ioc/graphql/field'
import query from '#ioc/graphql/query'

export default () =>
  query()
    .cantBeCached()
    .fields({
      checkoutAgreements: field({
        agreement_id: field(),
        checkbox_text: field(),
        content: field(),
        mode: field(),
        name: field(),
      }),
    })
