export default (data: any) => ({
  id: data.agreement_id as number,
  checkboxText: data.checkbox_text as string,
  content: data.content as string,
  mode: (data.mode ?? 'MANUAL') as 'AUTO' | 'MANUAL',
  name: data.name as string,
})
