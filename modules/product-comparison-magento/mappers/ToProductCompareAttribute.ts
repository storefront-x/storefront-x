export default (data: any) => ({
  value: data.value === 'N/A' ? '-' : data.value ?? '',
})
