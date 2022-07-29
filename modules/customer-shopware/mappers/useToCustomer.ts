export default () => (data: any) => ({
  id: data.id ?? '',
  salutationId: data.salutationId ?? '',
  email: data.email ?? '',
  firstName: data.firstName ?? '',
  lastName: data.lastName ?? '',
})
