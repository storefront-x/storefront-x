export default (data: any) => ({
  message: data?.message ?? '',
  code: data?.code ?? '',
})
