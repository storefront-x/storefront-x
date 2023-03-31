export default (data: any) => ({
  index: data.value_index || 0,
  label: data.label || '',
  swatchData: data.swatch_data || null,
  thumbnail: data.swatch_data?.thumbnail || null,
})
