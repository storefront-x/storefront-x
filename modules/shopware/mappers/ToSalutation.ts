export default (data: any) => ({
  id: data.id as string,
  salutationKey: data.salutationKey as string,
  displayName: data.displayName as string,
  letterName: data.letterName as string,
  createdAt: data.createdAt as string,
})
