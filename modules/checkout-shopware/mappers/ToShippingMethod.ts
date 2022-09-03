export default (data: any) => ({
  id: data.id as string,
  name: data.name as string,
  deliveryLabel: data.deliveryTime.translated.name as string,
})
