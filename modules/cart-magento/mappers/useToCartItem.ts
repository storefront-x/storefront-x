export default () => (data: any) => ({
  id: data.id as string,
  quantity: data.quantity as number,
})
