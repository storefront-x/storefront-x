export default () => (data: any) => ({
  id: data.id as string,
  salutationId: data.salutationId as string,
  salutation: data.salutation.displayName as string,
  email: data.email as string,
  firstName: data.firstName as string,
  lastName: data.lastName as string,
  title: data.title as string,
})
