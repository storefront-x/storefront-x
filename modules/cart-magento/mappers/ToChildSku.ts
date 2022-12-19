export default (data: any) => ({
  id: data.cart_item_id as string,
  sku: data.sku as string,
})
