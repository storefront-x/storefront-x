import ToMoney from '#ioc/mappers/ToMoney'

export default (data: any) => ({
  id: data?.id ?? 0,
  productName: data?.product_name ?? '',
  productSku: data?.product_sku ?? '',
  productType: data?.product_type ?? '',
  productUrlKey: data?.product_url_key ?? '',
  productUrlPath: `/${data?.product_url_key}.html` ?? '',
  status: data?.status ?? '',
  enteredOptions: data?.entered_options.map(toOrderItemOption) ?? [],
  selectedOptions: data?.selected_options.map(toOrderItemOption) ?? [],
  productSalePrice: ToMoney(data?.product_sale_price) ?? null,
  quantityCanceled: data?.quantity_canceled ?? 0,
  quantityInvoiced: data?.quantity_invoiced ?? 0,
  quantityOrdered: data?.quantity_ordered ?? 0,
  quantityReturned: data?.quantity_canceled ?? 0,
  quantityShipped: data?.quantity_shipped ?? 0,
})

const toOrderItemOption = (data: any) => ({
  label: data?.label ?? '',
  value: data?.value ?? '',
})
