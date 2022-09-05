const ToProductLabel = (data: any) => ({
  id: data.label_id ?? 0,
  image: '/' + data.image || '',
  size: data.size || '',
  style: data.style || '',
  text: data.txt || '',
})

export default ToProductLabel
