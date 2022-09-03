export default (data: any) => ({
  id: data.id as string,
  name: data.name as string,
  createdAt: data.createdAt as string,
})
