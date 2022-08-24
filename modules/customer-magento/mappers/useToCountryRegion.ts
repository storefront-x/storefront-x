export default () => {
  return (data: any) => ({
    id: data.id ?? '',
    code: data.code ?? '',
    name: data.name ?? '',
  })
}
