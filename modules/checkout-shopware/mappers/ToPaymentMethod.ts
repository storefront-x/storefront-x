export default (data: any) => ({
  id: data.id as string,
  name: data.translated.name as string,
  description: data.translated.description as string,
})
