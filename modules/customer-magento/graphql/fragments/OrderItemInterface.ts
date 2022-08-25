import field from '#ioc/graphql/field'

export default () => ({
  id: field(),
  product_name: field(),
  product_sku: field(),
  product_url_key: field(),
  status: field(),
  product_sale_price: field({
    value: field(),
    currency: field(),
  }),
  quantity_ordered: field(),
  quantity_invoiced: field(),
  quantity_shipped: field(),
  entered_options: field({
    label: field(),
    value: field(),
  }),
  selected_options: field({
    label: field(),
    value: field(),
  }),
})
